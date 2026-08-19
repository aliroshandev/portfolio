# Booking / Appointment Feature

The `/book` route gives visitors an interactive, Google-Appointments-style calendar to schedule a free
meeting with you — from **15 minutes up to 2 hours in 15-minute steps** — over Google Meet. Everything
lives in this Angular app (no backend required) and is SSR/prerender-safe, so SEO is preserved.

## How it works

1. Visitor opens `/book` and sees a month calendar of your **free times**.
2. They pick a meeting length (15 min → 2 h, steps of 15), then an available day, then an open slot.
3. They fill a small form (name, email, organization, optional notes).
4. On confirm, the app:
   - opens **Google Calendar** with the event pre-filled (`calendar.google.com/calendar/render?action=TEMPLATE`),
   - adds **you** (`a76roshanzamir@gmail.com`) as an attendee, so the meeting also appears in your
     Gmail / Calendar inbox,
   - stores the booking locally so the slot can't be double-booked from the same browser,
   - offers a downloadable `.ics` file as an alternative.

## Real Google Calendar data

When configured, busy times are **fetched live from the Google Calendar API** and replace the static
`busySlots` list — and once a real sync completes it is **authoritative even when empty** (no more fake
busy days from the fallback list bleed into a real free calendar). See
[GOOGLE-CALENDAR-SETUP.md](GOOGLE-CALENDAR-SETUP.md) for the exact steps and the requirements you need
to provide.

## Configuration

Edit `src/app/constants/booking-config.ts`:

| Key | Purpose |
|-----|---------|
| `ownerEmail` | Your Gmail — added as attendee on every booked meeting |
| `timezone` | Your local timezone (default `Asia/Tehran`) — all slots are shown/scheduled in this zone |
| `durationStepMinutes` | Step between durations, e.g. `15` |
| `minDurationMinutes` | Shortest bookable meeting, e.g. `15` |
| `maxDurationMinutes` | Longest bookable meeting, e.g. `120` (2 hours) |
| `defaultDurationMinutes` | Preselected duration, e.g. `60` |
| `slotIntervalMinutes` | Gap between slot starts (default `15`) |
| `bufferMinutes` | Optional buffer around each booking (default `0`) |
| `minLeadMinutes` | Minimum notice before a meeting can be booked (default `180`) |
| `aheadDays` | How far ahead slots are offered (default `45`) |
| `openingHours` | Per weekday `[startHour, endHour]` availability window (`null` = closed) |
| `busySlots` | **Fallback only** busy blocks when no live credentials are configured; real synced data always wins (even when the calendar is empty) |
| `googleApiKey` / `googleCalendarId` / `googleClientId` | Optional per-deploy overrides; primary source is the injected environment (see below) |

## Google credentials (environment injection)

Credentials never live in git. They are injected at build time from **Vercel env vars** (or a local
`.env`) by `scripts/set-env.mjs` (wired via the `prebuild` npm hook) into the **gitignored**
`src/environments/environment.production.ts`:

- `GOOGLE_API_KEY` — browser-restricted API key (public-calendar busy-time sync via
  `GoogleCalendarService.sync()`).
- `GOOGLE_CALENDAR_ID` — calendar to query (`primary` = `a76roshanzamir@gmail.com`).
- `GOOGLE_CLIENT_ID` — OAuth web client id for the optional owner "Connect Google Calendar" flow, which
  enables reading the **private** calendar and creating events **directly via the API** (with Google
  Meet + guest invite emails). See [GOOGLE-CALENDAR-SETUP.md](GOOGLE-CALENDAR-SETUP.md).

Precedence: Vercel env (`environment.google.*`) → `booking-config.ts` override → committed empty defaults.
Copy `.env.example` → `.env` for local dev.

The calendar page marks days as **Available / Partially booked / Busy / Closed** via the legend and shows
live-sync indicators (public calendar or owner-connected) when live data is active.

## Route & SEO

- Route: `src/app/app.routes.ts` (lazy-loaded, title + prerendered static shell)
- SEO handled in `src/app/pages/book/book.component.ts` (meta description, canonical, JSON-LD `Service` schema)
- Sitemap entry in `public/sitemap-config.xml`