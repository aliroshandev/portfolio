import {
  afterNextRender, Component, computed, inject, OnInit, signal,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapCalendarMonth, bootstrapCalendarCheck, bootstrapCalendarX,
  bootstrapCalendarRange, bootstrapChevronLeft, bootstrapChevronRight,
  bootstrapClock, bootstrapCameraVideo, bootstrapPerson,
  bootstrapEnvelope, bootstrapBuilding, bootstrapChatDots, bootstrapCheckLg,
  bootstrapArrowRight, bootstrapInfoCircle, bootstrapCloudCheck, bootstrapCheck,
} from '@ng-icons/bootstrap-icons';
import {SeoService} from '../../services/seo.service';
import {BookingService} from '../../services/booking.service';
import {GoogleCalendarService} from '../../services/google-calendar.service';
import {
  BookingDetails, BusyBlock, DayAvailability, TimeSlot,
} from '../../models/booking';

interface BookingForm {
  name: FormControl<string>;
  email: FormControl<string>;
  organization: FormControl<string>;
  notes: FormControl<string>;
}

@Component({
  selector: 'app-book',
  imports: [NgIcon, ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  viewProviders: [provideIcons({
    bootstrapCalendarMonth, bootstrapCalendarCheck, bootstrapCalendarX,
    bootstrapCalendarRange, bootstrapChevronLeft, bootstrapChevronRight,
    bootstrapClock, bootstrapCameraVideo, bootstrapPerson,
    bootstrapEnvelope, bootstrapBuilding, bootstrapChatDots, bootstrapCheckLg,
    bootstrapArrowRight, bootstrapInfoCircle, bootstrapCloudCheck, bootstrapCheck,
  })]
})
export class BookComponent implements OnInit {
  readonly #booking = inject(BookingService);
  readonly #seo = inject(SeoService);
  readonly #google = inject(GoogleCalendarService);

  readonly config = this.#booking.config;
  readonly booking = this.#booking;

  ready = signal(false);
  loadingLive = signal(true);
  connectingGoogle = signal(false);
  viewDate = signal<Date>(new Date());
  days = signal<DayAvailability[]>([]);
  selectedDay = signal<DayAvailability | null>(null);
  selectedDuration = signal(this.config.defaultDurationMinutes);
  slots = signal<TimeSlot[]>([]);
  selectedSlot = signal<TimeSlot | null>(null);
  busyBlocks = signal<BusyBlock[]>([]);
  confirmed = signal(false);
  createdUrl = signal('');

  durationOptions = computed(() => this.#booking.durationOptions);

  liveSynced = computed<boolean>(() => this.#booking.liveBusy().length > 0);

  monthLabel = computed(() =>
    this.viewDate().toLocaleDateString('en-US', {month: 'long', year: 'numeric'}));

  readonly weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  readonly form = new FormGroup<BookingForm>({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(2)]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    organization: new FormControl('', {nonNullable: true}),
    notes: new FormControl('', {nonNullable: true}),
  });

  constructor() {
    if (this.#booking.isBrowser) {
      afterNextRender(() => this.#init());
    }
  }

  ngOnInit(): void {
    const title = 'Book a 1:1 Meeting | Ali Roshanzamir';
    const desc = `Schedule a free Google Meet call with Ali Roshanzamir, Frontend Engineer & Angular Specialist — 15 min to 2 hours, booked directly on his Google Calendar in ${this.config.timezoneLabel}.`;

    this.#seo.setTitle(title);
    this.#seo.setMetaDescription(desc);
    this.#seo.setOgTags(title, desc);
    this.#seo.updateCanonical('https://aliroshanzamir.info/book');
    this.#seo.setJsonLd(this.#seoData());
  }

  async #init(): Promise<void> {
    const now = new Date();
    const tzToday = this.#booking.currentLocalDateString(now);
    const [y, m] = tzToday.split('-').map(Number);
    this.viewDate.set(new Date(y, m - 1, 1));
    this.#rebuildMonth();
    this.ready.set(true);

    await this.#google.sync();
    this.loadingLive.set(false);
    // busy data changed -> refresh calendar + any selected day
    this.#rebuildMonth();
    const day = this.selectedDay();
    if (day) this.refreshSlots(day);
  }

  #rebuildMonth(): void {
    const v = this.viewDate();
    this.days.set(this.#booking.buildMonth(v.getMonth() + 1, v.getFullYear(), new Date()));
    this.selectedDay.set(null);
    this.slots.set([]);
    this.selectedSlot.set(null);
    this.busyBlocks.set([]);
    this.confirmed.set(false);
  }

  prevMonth(): void {
    const v = this.viewDate();
    this.viewDate.set(new Date(v.getFullYear(), v.getMonth() - 1, 1));
    this.#rebuildMonth();
  }

  nextMonth(): void {
    const v = this.viewDate();
    this.viewDate.set(new Date(v.getFullYear(), v.getMonth() + 1, 1));
    this.#rebuildMonth();
  }

  selectDay(day: DayAvailability): void {
    if (day.isClosed || !day.isCurrentMonth) return;
    this.selectedDay.set(day);
    this.refreshSlots(day);
  }

  setDuration(minutes: number): void {
    this.selectedDuration.set(minutes);
    const day = this.selectedDay();
    if (day) this.refreshSlots(day);
  }

  refreshSlots(day: DayAvailability): void {
    this.slots.set(this.#booking.freeSlotsOn(day.date, new Date(), this.selectedDuration()));
    this.busyBlocks.set(this.#booking.busyBlocksOn(day.date));
    this.selectedSlot.set(null);
  }

  selectSlot(slot: TimeSlot): void {
    this.selectedSlot.set(slot);
  }

  details(): BookingDetails {
    const f = this.form.getRawValue();
    return {
      name: f.name,
      email: f.email,
      organization: f.organization || undefined,
      notes: f.notes || undefined,
    };
  }

  canSubmit(): boolean {
    return !!this.selectedSlot() && this.form.valid;
  }

  // True when the owner has connected their own calendar via OAuth (live busy + direct create).
  ownerConnected = computed(() => this.#google.ownerConnected());
  needsOwnerConsent = computed(() => this.#google.needsOwnerConsent());
  calendarSource = computed(() => this.#google.busySource());

  async connectGoogle(): Promise<void> {
    this.connectingGoogle.set(true);
    try {
      await this.#google.connectOwner();
    } finally {
      this.connectingGoogle.set(false);
    }
  }

  async confirmBooking(): Promise<void> {
    const slot = this.selectedSlot();
    if (!slot || this.form.invalid) return;
    const details = this.details();

    if (this.#google.hasOwnerAuth) {
      const created = await this.#google.createEvent(slot, details);
      if (created) {
        this.confirmed.set(true);
        this.createdUrl.set('');
        return;
      }
    }

    this.#booking.saveBooking(slot.date, slot.localStart, details.email);
    this.createdUrl.set(this.#booking.buildGoogleCalendarUrl(slot, details));
    this.confirmed.set(true);
    window.open(this.createdUrl(), '_blank', 'noopener');
  }

  downloadIcs(): void {
    const slot = this.selectedSlot();
    if (!slot) return;
    const details = this.details();
    const ics = this.#buildIcs(slot, details);
    const blob = new Blob([ics], {type: 'text/calendar;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-with-ali-${slot.date}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  #buildIcs(slot: TimeSlot, details: BookingDetails): string {
    const fmt = (e: number) => {
      const d = new Date(e);
      const p = (n: number) => String(n).padStart(2, '0');
      return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}` +
        `T${p(d.getUTCHours())}${p(d.getUTCMinutes())}00Z`;
    };
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ali Roshanzamir//Booking//EN',
      'BEGIN:VEVENT',
      'UID:' + `${slot.startEpoch}@aliroshanzamir.info`,
      'DTSTAMP:' + fmt(Date.now()),
      `DTSTART:${fmt(slot.startEpoch)}`,
      `DTEND:${fmt(slot.endEpoch)}`,
      `SUMMARY:1:1 call with Ali Roshanzamir`,
      `ORGANIZER;CN=${this.config.ownerName}:mailto:${this.config.ownerEmail}`,
      `ATTENDEE;CN=${details.name}:mailto:${details.email}`,
      `ATTENDEE;CN=${this.config.ownerName}:mailto:${this.config.ownerEmail}`,
      `DESCRIPTION:${details.name}${details.organization ? ' (' + details.organization + ')' : ''}\\nEmail: ${details.email}\\nGoogle Meet video call${details.notes ? '\\nNotes: ' + details.notes : ''}`,
      'LOCATION:Google Meet (video link added automatically)',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    return lines.join('\r\n');
  }

  dayStateLabel(day: DayAvailability): string {
    if (!day.isCurrentMonth || day.isClosed) return `${day.day}, not available`;
    const state = day.state === 'available' ? 'available'
      : day.state === 'partial' ? 'partially booked'
      : day.state === 'busy' ? 'fully booked' : 'closed';
    return `${day.day}, ${state}${day.freeSlotCount ? `, ${day.freeSlotCount} open slots` : ''}`;
  }

  blockLabel(block: BusyBlock): string {
    const from = this.#hhmm(block.fromHour);
    const to = this.#hhmm(block.toHour);
    return `${this.#booking.formatClock(from)} – ${this.#booking.formatClock(to)}`;
  }

  #hhmm(hour: number): string {
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  reset(): void {
    this.confirmed.set(false);
    this.createdUrl.set('');
    this.selectedSlot.set(null);
    this.form.reset({name: '', email: '', organization: '', notes: ''});
  }

  #seoData(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: '1:1 Consultation Call',
      serviceType: 'Technical Consultation',
      provider: {
        '@type': 'Person',
        name: this.config.ownerName,
        email: this.config.ownerEmail,
        url: 'https://aliroshanzamir.info',
      },
      areaServed: 'Worldwide',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceLocation: { '@type': 'Place', name: 'Online (Google Meet)' },
      },
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    };
  }
}