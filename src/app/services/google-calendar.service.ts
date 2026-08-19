import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BookingService} from './booking.service';
import {BookingDetails, BusyBlock, TimeSlot} from '../models/booking';

type BusySource = 'none' | 'public' | 'owner';

interface CalendarEvent {
  summary?: string;
  start?: {dateTime?: string; date?: string};
  end?: {dateTime?: string; date?: string};
}

interface CalendarResponse {
  items?: CalendarEvent[];
  error?: {code: number; message: string};
}

interface GisTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
  /** OAuth grant callback gives an opaque token response; on deny it may be empty. */
}

type GisWindow = Window & {
  google?: {
    accounts?: {
      oauth2?: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (resp: GisTokenResponse) => void;
        }) => {requestAccessToken: (opts?: {prompt?: string}) => void};
        revoke?: (token: string, done: () => void) => void;
      };
    };
  };
};

const GIS_SRC = 'https://accounts.google.com/gsi/client';
const SCOPE = 'https://www.googleapis.com/auth/calendar.events';
const CAL_API = 'https://www.googleapis.com/calendar/v3';

@Injectable({providedIn: 'root'})
export class GoogleCalendarService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #booking = inject(BookingService);

  /** Which calendar source supplied the busy times shown on the booking page. */
  busySource = signal<BusySource>('none');
  /** True once a Google Identity token was obtained for the owner's own calendar. */
  ownerConnected = signal(false);
  /** True when a connect gesture is still needed to read the private calendar. */
  needsOwnerConsent = signal(false);
  /** In-memory access token (never persisted). */
  #accessToken: string | null = null;
  #tokenClient: {requestAccessToken: (o?: {prompt?: string}) => void} | null = null;
  #gisPromise: Promise<void> | null = null;

  get hasPublicReadAccess(): boolean {
    return this.#booking.hasPublicReadAccess;
  }

  get hasOwnerAuth(): boolean {
    return !!this.#accessToken;
  }

  /** Load the Google Identity Services script once (browser only). */
  #ensureGis(): Promise<void> {
    if (!isPlatformBrowser(this.#platformId)) return Promise.resolve();
    if (this.#gisPromise) return this.#gisPromise;
    this.#gisPromise = new Promise<void>((resolve, reject) => {
      const win = window as GisWindow;
      if (win.google?.accounts?.oauth2) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = GIS_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        this.#gisPromise = null;
        reject(new Error('Failed to load Google Identity Services'));
      };
      document.head.appendChild(script);
    });
    return this.#gisPromise;
  }

  /** Initialise the token client bound to the configured client id. */
  #initTokenClient(): void {
    const clientId = this.#booking.googleClientId;
    if (!clientId) return;
    const win = window as GisWindow;
    this.#tokenClient = win.google!.accounts!.oauth2!.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (resp) => this.#handleTokenResponse(resp),
    });
  }

  #handleTokenResponse(resp: GisTokenResponse): void {
    if (resp.access_token) {
      this.#accessToken = resp.access_token;
      this.ownerConnected.set(true);
      this.needsOwnerConsent.set(false);
      // Immediately refresh busy times from the owner's private calendar.
      void this.#loadOwnerEvents();
    } else {
      // No active session / consent missing / denied -> keep placeholders, offer a connect gesture.
      this.needsOwnerConsent.set(true);
    }
  }

  /** Attempt a SILENT auth (no prompt). Works only when the owner is already signed in
   *  and has previously granted consent. Safe for visitors: no UI, no popup. */
  async trySilentOwnerAuth(): Promise<boolean> {
    if (!this.#booking.googleClientId) return false;
    if (!isPlatformBrowser(this.#platformId)) return false;
    await this.#ensureGis();
    this.#initTokenClient();
    if (!this.#tokenClient) return false;
    return new Promise<boolean>((resolve) => {
      const done = () => {
        setTimeout(() => resolve(this.hasOwnerAuth), 0);
      };
      try {
        this.#tokenClient!.requestAccessToken({prompt: ''});
        done();
      } catch {
        this.needsOwnerConsent.set(true);
        resolve(false);
      }
    });
  }

  /** Explicit connect for the owner (shows Google's consent popup once). */
  async connectOwner(): Promise<boolean> {
    if (this.hasOwnerAuth) return true;
    if (!this.#booking.googleClientId || !isPlatformBrowser(this.#platformId)) return false;
    await this.#ensureGis();
    this.#initTokenClient();
    if (!this.#tokenClient) return false;
    return new Promise<boolean>((resolve) => {
      let settled = false;
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true;
        resolve(ok);
      };
      const clientId = this.#booking.googleClientId;
      const win = window as GisWindow;
      this.#tokenClient = win.google!.accounts!.oauth2!.initTokenClient({
        client_id: clientId,
        scope: SCOPE,
        callback: (resp) => {
          this.#handleTokenResponse(resp);
          finish(!!resp.access_token);
        },
      });
      try {
        this.#tokenClient.requestAccessToken();
      } catch {
        this.needsOwnerConsent.set(true);
        finish(false);
      }
    });
  }

  /** Synchronise real busy times. Priority: public calendar (API key) → owner's private calendar (OAuth). */
  async sync(): Promise<void> {
    if (!isPlatformBrowser(this.#platformId)) return;

    if (this.hasPublicReadAccess) {
      await this.#loadPublicEvents();
      return;
    }

    if (this.#booking.googleClientId) {
      const ok = await this.trySilentOwnerAuth();
      if (!ok && !this.ownerConnected()) {
        this.needsOwnerConsent.set(true);
      }
    }
  }

  async #loadPublicEvents(): Promise<void> {
    const calendarId = this.#booking.googleCalendarId;
    const apiKey = this.#booking.googleApiKey;
    const {timeMin, timeMax, url} = this.#baseUrl(calendarId);
    void timeMin;
    void timeMax;
    try {
      const res = await fetch(
        url + `&key=${encodeURIComponent(apiKey)}`,
        {headers: {Accept: 'application/json'}},
      );
      const data = await res.json() as CalendarResponse;
      if (data.error) {
        console.error('[GoogleCalendar] API error', data.error);
        return;
      }
      const blocks = this.#toBusyBlocks(data.items ?? []);
      this.#booking.liveBusy.set(blocks);
      this.#booking.liveBusyLoaded.set(true);
      this.busySource.set('public');
      console.log(`[GoogleCalendar] synced ${blocks.length} busy blocks (public calendar)`);
    } catch (err) {
      console.error('[GoogleCalendar] public sync failed', err);
    }
  }

  async #loadOwnerEvents(): Promise<void> {
    if (!this.#accessToken) return;
    const {timeMin, timeMax, url} = this.#baseUrl('primary');
    void timeMin;
    void timeMax;
    try {
      const res = await fetch(url, {
        headers: {Authorization: `Bearer ${this.#accessToken}`, Accept: 'application/json'},
      });
      const data = await res.json() as CalendarResponse;
      if (data.error) {
        console.error('[GoogleCalendar] owner API error', data.error);
        return;
      }
      const blocks = this.#toBusyBlocks(data.items ?? []);
      this.#booking.liveBusy.set(blocks);
      this.#booking.liveBusyLoaded.set(true);
      this.busySource.set('owner');
      console.log(`[GoogleCalendar] synced ${blocks.length} busy blocks (owner calendar)`);
    } catch (err) {
      console.error('[GoogleCalendar] owner sync failed', err);
    }
  }

  /** Create the meeting directly on the owner's calendar via the API (when authorized). */
  async createEvent(slot: TimeSlot, details: BookingDetails): Promise<boolean> {
    if (!this.#accessToken || !isPlatformBrowser(this.#platformId)) return false;
    const minutes = (slot.endEpoch - slot.startEpoch) / 60000;
    const summary = `1:1 call with ${details.name} (${minutes} min)`;
    const description = `${details.name}${details.organization ? ` (${details.organization})` : ''}\n`
      + `Email: ${details.email}\nGoogle Meet video call\n`
      + (details.notes ? `Notes: ${details.notes}` : '');
    const body = {
      summary,
      description,
      start: {dateTime: new Date(slot.startEpoch).toISOString()},
      end: {dateTime: new Date(slot.endEpoch).toISOString()},
      attendees: [{email: details.email}, {email: this.#booking.config.ownerEmail}],
      guestsCanModify: false,
    };
    try {
      const res = await fetch(
        `${CAL_API}/calendars/primary/events?sendUpdates=all&conferenceDataVersion=1`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.#accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => null) as CalendarResponse;
        console.error('[GoogleCalendar] createEvent failed', err?.error ?? res.status);
        return false;
      }
      this.#booking.saveBooking(slot.date, slot.localStart, details.email);
      console.log('[GoogleCalendar] event created via API');
      return true;
    } catch (err) {
      console.error('[GoogleCalendar] createEvent error', err);
      return false;
    }
  }

  #baseUrl(calendarId: string): {timeMin: string; timeMax: string; url: string} {
    const timeMin = new Date();
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date(timeMin.getTime() + this.#booking.config.aheadDays * 24 * 60 * 60 * 1000);
    const url = `${CAL_API}/calendars/${encodeURIComponent(calendarId)}/events`
      + `?timeMin=${timeMin.toISOString()}`
      + `&timeMax=${timeMax.toISOString()}`
      + '&singleEvents=true'
      + '&orderBy=startTime'
      + '&maxResults=2500';
    return {timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString(), url};
  }

  #toBusyBlocks(events: CalendarEvent[]): BusyBlock[] {
    const blocks: BusyBlock[] = [];
    for (const ev of events) {
      if (!ev.start?.dateTime || !ev.end?.dateTime) continue; // skip all-day events
      const s = new Date(ev.start.dateTime);
      const e = new Date(ev.end.dateTime);
      blocks.push({
        date: this.#booking.currentLocalDateString(s),
        fromHour: this.#hourOf(s),
        toHour: this.#hourOf(e),
        label: ev.summary,
      });
    }
    return blocks;
  }

  #hourOf(d: Date): number {
    try {
      const parts: Record<string, string> = {};
      const segs = new Intl.DateTimeFormat('en-US', {
        timeZone: this.#booking.config.timezone, hour: '2-digit', minute: '2-digit', hour12: false,
      }).formatToParts(d);
      for (const p of segs) parts[p.type] = p.value;
      return (+parts['hour']! % 24) + (+parts['minute']!) / 60;
    } catch {
      return d.getHours() + d.getMinutes() / 60;
    }
  }
}