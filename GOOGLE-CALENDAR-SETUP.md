# Google Calendar Setup (Live Busy Times)

To make the booking page show **real free/busy times from your Google Calendar**, the app calls the
**Google Calendar API** from the browser. It is already wired up — you just need to provide three values via
**environment variables** (never committed to git):

| Vercel env var (or local `.env`) | Purpose |
|---|---|
| `GOOGLE_API_KEY` | Browser-restricted API key (read public calendar busy times) |
| `GOOGLE_CALENDAR_ID` | Calendar to query, e.g. `primary` (your `a76roshanzamir@gmail.com` calendar) |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 web client id (owner "Connect Google Calendar" flow) |

These are injected at build time by `scripts/set-env.mjs` (runs via the `prebuild` hook) and written into
the **gitignored** `src/environments/environment.production.ts`. Values resolve with this precedence:
browser-level Vercel env → config override in `booking-config.ts` → committed defaults (empty).

- Copy `.env.example` → `.env` for **local** development; `npm start` picks it up automatically.
- Set the same keys in **Vercel → Project → Environment Variables** for production.

Once configured, `GoogleCalendarService.sync()` fetches your real events for the next `aheadDays` days
and uses them INSTEAD of the static `busySlots` list.

## What I need from you (requirements)

Please answer these so the live sync is fully yours:

1. **Google Cloud project** — Do you have one, or should I guide you to create one free at
   https://console.cloud.google.com? A project is required to enable the Calendar API and mint an API key.

2. **API key** — Confirm you will create a Google Cloud **API key** with:
   - Enabled **Google Calendar API**
   - **Restricted to your domain** (HTTP referrers: `https://aliroshanzamir.info/*`) so the key can't be
     misused by others. This is the correct, safe pattern for a static site.

3. **Calendar visibility** — The Calendar API key can only read **public** calendars. Your primary
   calendar is private by default, so to read its busy times you must either:
   - **(A)** Share it publicly: Calendar settings → find your calendar → "Access permissions" → tick
     "Make available to public" and "See all event details", **or**
   - **(B)** Create a dedicated calendar (e.g. "Availability") and share it publicly, then set
     `GOOGLE_CALENDAR_ID` to that calendar's id.
   Which option do you prefer? (A is easiest — it's usually the real primary calendar.)

4. **Calendar ID** — Set `GOOGLE_CALENDAR_ID=primary` (your main `a76roshanzamir@gmail.com` calendar) or a
   specific `xxxx@group.calendar.google.com`. I recommend `primary`.

5. **Write-access (optional, bigger setup)** — Bookings currently use Google's "add to calendar" link
   (the visitor confirms on Google's own page; you're auto-added as an attendee). If you want the app to
   **create the event on your calendar automatically with the Google API**, provide a Google **OAuth 2.0
   web Client ID** (`GOOGLE_CLIENT_ID`) + your authorized JavaScript origin
   (e.g. `https://aliroshanzamir.info`). See "Owner connect (OAuth)" below.

## OAuth scopes

When registering the app, add **one** Calendar scope — nothing else. Pick this exact one:

| Scope (value) | Meaning |
|---------------|---------|
| `https://www.googleapis.com/auth/calendar.events` | **View and edit events on all your calendars** — covers reading busy times AND creating events. This is the only scope needed. |

Do **not** select `calendar.readonly` (redundant), the full `calendar` scope (also grants calendar
settings/ACL access — broader than needed), `calendar.calendarlist.*`, or anything outside Calendar.

Notes:
- `calendar.events` is a **Sensitive** scope, not Restricted. Google will show an "unverified app" warning
  to users unless you complete verification, but for this single-owner portfolio use you can accept the
  warning or add your Google account as a **Test user** on the consent screen to skip it.
- Use the **external** user type on the consent screen and add `a76roshanzamir@gmail.com` as a test user —
  no annual review needed at this scale.

## Owner connect (OAuth)

With `GOOGLE_CLIENT_ID` set, the booking page offers a **"Connect Google Calendar"** button (shown only to
the owner when the private calendar isn't linked yet). It uses **Google Identity Services** with the
single `calendar.events` scope:

1. Google loads the GIS script (`accounts.google.com/gsi/client`) on demand.
2. `GoogleCalendarService.sync()` first tries a **silent** token request (no popup) — if the owner is
   already signed in with a valid session, the private calendar's busy times load automatically.
3. Otherwise a small connect banner appears; clicking it opens Google's consent popup once.
4. With a token, busy times come from the **owner's private calendar** (`primary`) and
   `confirmBooking()` creates the event **directly via the API** (with Google Meet `conferenceData`),
   emailing the guest invite — no redirect to Google Calendar needed.

The token stays **in-memory only** (never persisted, never serialized) and dies on page reload.

## Step-by-step (for options A + API key, no OAuth)

1. Go to https://console.cloud.google.com → create/select a project.
2. **APIs & Services → Library** → search **Google Calendar API** → **Enable**.
3. **APIs & Services → Credentials → Create credentials → API key**.
4. Click **Edit API key** → set **Application restrictions** → **HTTP referrers** →
   add `https://aliroshanzamir.info/*` (and `http://localhost:4200/*` for local testing).
5. Set `GOOGLE_API_KEY` and `GOOGLE_CALENDAR_ID=primary` in Vercel env vars (or local `.env`).
6. For the OAuth flow, create an **OAuth 2.0 web client** in Credentials → set the authorized origin to
   `https://aliroshanzamir.info` (and `http://localhost:4200`), add the `calendar.events` scope, and set
   `GOOGLE_CLIENT_ID`. Add `a76roshanzamir@gmail.com` as a **Test user** on the consent screen.

Your real busy events will then show up automatically on the booking calendar.