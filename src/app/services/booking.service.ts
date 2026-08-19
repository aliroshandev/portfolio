import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {bookingConfig} from '../constants/booking-config';
import {environment} from '../../environments/environment';
import {
  BookingConfig, BookingDetails, BusyBlock, DayAvailability,
  DurationOption, StoredBooking, TimeSlot,
} from '../models/booking';

const STORAGE_KEY = 'portfolio_bookings';

@Injectable({providedIn: 'root'})
export class BookingService {
  readonly config: BookingConfig = bookingConfig;
  readonly #platformId = inject(PLATFORM_ID);

  /** Real busy blocks fetched from Google Calendar (when configured). */
  liveBusy = signal<BusyBlock[]>([]);

  /** True once a real Google Calendar sync has completed (even when the result is empty).
   *  Once set, live data is authoritative and the static `busySlots` fallback is never used. */
  liveBusyLoaded = signal(false);

  get isBrowser(): boolean {
    return isPlatformBrowser(this.#platformId);
  }

  // Effective Google credentials: per-deploy config override first, then environment injection.
  get googleApiKey(): string {
    return this.config.googleApiKey || environment.google.apiKey || '';
  }

  get googleCalendarId(): string {
    return this.config.googleCalendarId || environment.google.calendarId || 'primary';
  }

  get googleClientId(): string {
    return this.config.googleClientId || environment.google.clientId || '';
  }

  get hasPublicReadAccess(): boolean {
    return !!this.googleApiKey && !!this.googleCalendarId;
  }

  /** Available meeting durations: 15-min steps from min to max. */
  get durationOptions(): DurationOption[] {
    const opts: DurationOption[] = [];
    for (let m = this.config.minDurationMinutes; m <= this.config.maxDurationMinutes; m += this.config.durationStepMinutes) {
      opts.push({label: this.#durationLabel(m), minutes: m});
    }
    return opts;
  }

  /** Busy blocks in effect: live Google data when a real sync completed, otherwise static config. */
  activeBusy(): BusyBlock[] {
    return this.liveBusyLoaded() ? this.liveBusy() : this.config.busySlots;
  }

  /** Current wall-clock date string in the owner's timezone, e.g. "2026-08-19" */
  currentLocalDateString(now: Date = new Date()): string {
    return this.#localFields(now, (y, m, d) => `${y}-${m}-${d}`);
  }

  /** Build the calendar grid for a given month (1-based month index). */
  buildMonth(month: number, year: number, todayLocal: Date): DayAvailability[] {
    const grid: DayAvailability[] = [];
    const first = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // Monday-first offset
    const todayStr = this.currentLocalDateString(todayLocal);
    const duration = this.config.defaultDurationMinutes;

    const monthTotal = 6 * 7;
    for (let i = 0; i < monthTotal; i++) {
      const dayOffset = i - lead;
      const cellDate = new Date(year, month - 1, 1 + dayOffset);
      const isCurrentMonth = dayOffset >= 0 && dayOffset < daysInMonth;
      const dateStr = this.#localFields(cellDate, (y, m, d) => `${y}-${m}-${d}`);
      const weekday = cellDate.getDay();

      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;
      const isClosed = !isCurrentMonth || isPast || this.config.openingHours[weekday] == null;

      let state: DayAvailability['state'] = 'closed';
      let freeSlotCount = 0;
      if (isCurrentMonth && !isPast && !isClosed) {
        const free = this.#freeSlotsOn(dateStr, todayLocal, duration);
        freeSlotCount = free.length;
        if (free.length === 0) state = 'busy';
        else if (this.#busyBlocksOn(dateStr).length > 0) state = 'partial';
        else state = 'available';
      } else if (isCurrentMonth && !isPast && isClosed) {
        state = 'closed';
      } else if (isPast) {
        state = 'closed';
      }

      grid.push({
        date: dateStr,
        day: cellDate.getDate(),
        month: cellDate.getMonth() + 1,
        year: cellDate.getFullYear(),
        isCurrentMonth,
        isPast,
        isToday,
        isClosed,
        state,
        freeSlotCount,
      });
    }
    return grid;
  }

  /** All free, bookable slots of the given duration for a local date. */
  freeSlotsOn(date: string, todayLocal: Date, durationMinutes: number): TimeSlot[] {
    if (date < this.currentLocalDateString(todayLocal)) return [];
    return this.#freeSlotsOn(date, todayLocal, durationMinutes);
  }

  /** Busy time blocks (real/config busy + already-booked slots) for a date. */
  busyBlocksOn(date: string): BusyBlock[] {
    const blocks = this.#busyBlocksOn(date);
    for (const b of this.readBookings()) {
      if (b.date === date) {
        const [h, m] = b.localStart.split(':').map(Number);
        blocks.push({
          date: b.date,
          fromHour: h + m / 60,
          toHour: h + m / 60 + this.config.defaultDurationMinutes / 60,
          label: 'Booked',
        });
      }
    }
    return blocks.sort((a, b) => a.fromHour - b.fromHour);
  }

  #freeSlotsOn(date: string, todayLocal: Date, durationMinutes: number): TimeSlot[] {
    const [y, mo, d] = date.split('-').map(Number);
    const weekday = new Date(y, mo - 1, d).getDay();
    const hours = this.config.openingHours[weekday];
    if (!hours) return [];

    const startMin = hours[0] * 60;
    const endMin = hours[1] * 60;
    const busyRanges = this.#busyRangesMinutesOn(date);
    const bookedRanges = this.readBookings()
      .filter(b => b.date === date)
      .map(b => {
        const [h, m] = b.localStart.split(':').map(Number);
        const from = h * 60 + m;
        return [from, from + durationMinutes] as [number, number];
      });

    const slots: TimeSlot[] = [];
    const interval = this.config.slotIntervalMinutes;
    const lead = this.config.minLeadMinutes * 60000;
    for (let s = startMin; s + durationMinutes <= endMin; s += interval) {
      if (this.#overlaps(s, s + durationMinutes, busyRanges) ||
          this.#overlaps(s, s + durationMinutes, bookedRanges)) {
        continue;
      }
      const startEpoch = this.#localToEpoch(y, mo, d, s / 60);
      if (startEpoch - Date.now() < lead) {
        continue;
      }
      slots.push({
        date,
        localStart: this.#fmtMin(s),
        localEnd: this.#fmtMin(s + durationMinutes),
        startEpoch,
        endEpoch: this.#localToEpoch(y, mo, d, (s + durationMinutes) / 60),
      });
    }
    return slots;
  }

  #busyBlocksOn(date: string): BusyBlock[] {
    return this.activeBusy().filter(b => b.date === date);
  }

  #busyRangesMinutesOn(date: string): [number, number][] {
    return this.activeBusy()
      .filter(b => b.date === date)
      .map(b => [Math.round(b.fromHour * 60), Math.round(b.toHour * 60)] as [number, number]);
  }

  #overlaps(a: number, b: number, ranges: [number, number][]): boolean {
    return ranges.some(([s, e]) => a < e && b > s);
  }

  /** Build a Google Calendar "add to calendar" URL for this booking. */
  buildGoogleCalendarUrl(slot: TimeSlot, details: BookingDetails): string {
    const minutes = (slot.endEpoch - slot.startEpoch) / 60000;
    const text = encodeURIComponent(`1:1 call with ${this.config.ownerName} (${this.#durationLabel(minutes)})`);
    const dates = `${this.#formatEpoch(slot.startEpoch)}/${this.#formatEpoch(slot.endEpoch)}`;
    const detailsLines = [
      `${details.name}${details.organization ? ` (${details.organization})` : ''}`,
      `Email: ${details.email}`,
      ``,
      `Meeting type: Google Meet video call`,
    ];
    if (details.notes) detailsLines.push(``, `Notes: ${details.notes}`);
    const desc = encodeURIComponent(detailsLines.join('\n'));
    const location = encodeURIComponent('Google Meet (video link added automatically)');
    // owner added as attendee so the meeting lands in their Gmail/Calendar
    const add = encodeURIComponent(this.config.ownerEmail);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}` +
      `&dates=${dates}&details=${desc}&location=${location}&add=${add}&sf=true&output=xml`;
  }

  // ---- persistence (client-only) ----

  readBookings(): StoredBooking[] {
    if (!this.isBrowser) return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as StoredBooking[];
    } catch {
      return [];
    }
  }

  saveBooking(date: string, localStart: string, email: string): void {
    if (!this.isBrowser) return;
    const list = this.readBookings();
    list.push({date, localStart, email, createdAt: Date.now()});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // ---- low-level helpers ----

  #durationLabel(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const h = minutes / 60;
    return Number.isInteger(h) ? `${h} hour${h > 1 ? 's' : ''}` : `${h.toFixed(1)} hours`;
  }

  /** Convert a wall-clock (y, mo, d, hour decimal) in the owner's timezone to epoch ms. */
  #localToEpoch(y: number, mo: number, d: number, hour: number): number {
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60 + 0.5);
    const pseudo = Date.UTC(y, mo - 1, d, h, m, 0);
    let offset = this.#offsetMin(pseudo);
    let real = pseudo - offset * 60000;
    const offset2 = this.#offsetMin(real);
    real += (offset2 - offset) * 60000;
    return real;
  }

  #offsetMin(epochMs: number): number {
    try {
      const date = new Date(epochMs);
      const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: this.config.timezone,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      });
      const parts: Record<string, string> = {};
      for (const p of dtf.formatToParts(date)) parts[p.type] = p.value;
      const asUTC = Date.UTC(+parts['year'], +parts['month'] - 1, +parts['day'],
        +parts['hour'] % 24, +parts['minute'], +parts['second']);
      return (asUTC - date.getTime()) / 60000;
    } catch {
      return 3.5 * 60;
    }
  }

  #localFields(now: Date, fmt: (y: string, m: string, d: string) => string): string {
    if (!this.isBrowser) {
      return fmt('1970', '01', '01');
    }
    try {
      const dtf = new Intl.DateTimeFormat('en-CA', {
        timeZone: this.config.timezone,
        year: 'numeric', month: '2-digit', day: '2-digit',
      });
      const parts: Record<string, string> = {};
      for (const p of dtf.formatToParts(now)) parts[p.type] = p.value;
      return fmt(parts['year']!, parts['month']!, parts['day']!);
    } catch {
      const y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
      return fmt(String(y), String(m).padStart(2, '0'), String(d).padStart(2, '0'));
    }
  }

  #fmtMin(min: number): string {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  #formatEpoch(epochMs: number): string {
    const d = new Date(epochMs);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}` +
      `T${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`;
  }

  formatClock(hhmm: string): string {
    const [h, m] = hhmm.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  formatDateLabel(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d))
      .toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'});
  }
}