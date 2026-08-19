import {BookingConfig} from '../models/booking';

export const bookingConfig: BookingConfig = {
  ownerEmail: 'a76roshanzamir@gmail.com',
  ownerName: 'Ali Roshanzamir',
  ownerTitle: 'Frontend Engineer & Angular Specialist',
  ownerLocation: 'Google Meet',
  timezone: 'Asia/Tehran',
  timezoneLabel: 'Iran Standard Time (GMT+3:30)',

  // Meeting duration: 15-minute steps from 15 minutes up to 2 hours (default 1 hour)
  durationStepMinutes: 15,
  minDurationMinutes: 15,
  maxDurationMinutes: 120,
  defaultDurationMinutes: 60,

  slotIntervalMinutes: 15,
  bufferMinutes: 0,
  minLeadMinutes: 180,
  aheadDays: 45,

  // Weekday => [startHour, endHour] (24h, inclusive of the end hour). null = closed.
  // 0 = Sunday ... 6 = Saturday
  openingHours: {
    0: null,
    1: [9, 18],
    2: [9, 18],
    3: [9, 18],
    4: [9, 18],
    5: [9, 18],
    6: [9, 14],
  } as Record<number, [number, number] | null>,

  // STATIC busy blocks (fallback). When googleApiKey + googleCalendarId are provided below,
  // this list is REPLACED by live data fetched from the Google Calendar API.
  busySlots: [
    {
      date: '2026-08-21',
      fromHour: 12,
      toHour: 14,
      label: 'Team stand-up & review',
    },
    {
      date: '2026-08-25',
      fromHour: 10,
      toHour: 11,
      label: 'Interview',
    },
  ],

  // Real Google Calendar sync. Credentials are INJECTED at build time from Vercel env vars
  // (GOOGLE_CLIENT_ID / GOOGLE_API_KEY / GOOGLE_CALENDAR_ID) via scripts/set-env.mjs — see .env.example.
  // You may still override them per-deploy by setting these fields explicitly:
  // googleApiKey: '',
  // googleCalendarId: 'primary',
  // googleClientId: '',
};