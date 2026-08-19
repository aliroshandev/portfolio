export interface BusyBlock {
  /** Local wall-clock calendar date (Asia/Tehran), e.g. "2026-08-21" */
  date: string;
  fromHour: number;
  toHour: number;
  label?: string;
}

export interface DurationOption {
  label: string;
  minutes: number;
}

export interface BookingConfig {
  ownerEmail: string;
  ownerName: string;
  ownerTitle: string;
  ownerLocation: string;
  timezone: string;
  timezoneLabel: string;
  /** Smallest duration step, e.g. 15 minutes */
  durationStepMinutes: number;
  /** Shortest bookable meeting, e.g. 15 minutes */
  minDurationMinutes: number;
  /** Longest bookable meeting, e.g. 2 hours */
  maxDurationMinutes: number;
  /** Preselected duration, e.g. 60 minutes */
  defaultDurationMinutes: number;
  /** Gap between slot starts (in minutes) */
  slotIntervalMinutes: number;
  bufferMinutes: number;
  minLeadMinutes: number;
  aheadDays: number;
  openingHours: Record<number, [number, number] | null>;
  busySlots: BusyBlock[];
  /** Google Calendar integration (real busy-time sync). Leave empty to use busySlots only. */
  googleApiKey?: string;
  googleCalendarId?: string;
  googleClientId?: string;
}

export interface BookingDetails {
  name: string;
  email: string;
  organization?: string;
  notes?: string;
}

/** A concrete bookable meeting window for a given local date */
export interface TimeSlot {
  /** Local calendar date, e.g. "2026-08-21" */
  date: string;
  /** Local start wall-clock, e.g. "09:00" */
  localStart: string;
  /** Local end wall-clock, e.g. "10:00" */
  localEnd: string;
  /** Absolute start instant (epoch ms, UTC) */
  startEpoch: number;
  /** Absolute end instant (epoch ms, UTC) */
  endEpoch: number;
}

export interface DayAvailability {
  date: string;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isPast: boolean;
  isToday: boolean;
  isClosed: boolean;
  state: 'available' | 'partial' | 'busy' | 'closed';
  freeSlotCount: number;
}

export interface StoredBooking {
  date: string;
  localStart: string;
  email: string;
  createdAt: number;
}