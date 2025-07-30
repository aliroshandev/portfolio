import {
  inject,
  Injectable,
  linkedSignal,
  makeStateKey,
  PLATFORM_ID,
  Signal,
  signal,
  TransferState, WritableSignal
} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {USER_AGENT} from '../app.config.server';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  readonly #platformId = inject(PLATFORM_ID);
  readonly #transferState = inject(TransferState);
  readonly #breakpointObserver = inject(BreakpointObserver);

  title = signal('Ali Roshanzamir Golafzani | Portfolio');
  phoneNumber = signal('447351534063');
  scrollY = signal<number>(0);
  headerHeight: Signal<number> = signal<number>(76).asReadonly();
  isDesktop: WritableSignal<boolean | undefined> = signal<boolean | undefined>(undefined);
  isMobile = linkedSignal({
    source: this.isDesktop,
    computation: source => source != null ? !source : undefined
  });
  userAgent: string = '';
  userAgentKey = makeStateKey<string>('user-agent');

  constructor() {
    if (this.isServer) {
      this.userAgent = inject(USER_AGENT, {optional: true}) || 'Unknown User Agent';
      this.#transferState.set(this.userAgentKey, this.userAgent);
      this.isDesktop.set(this.isUserAgentFromDesktop(this.userAgent));
    } else {
      this.userAgent = this.#transferState.get(this.userAgentKey, '');
      const isDesktopObserved = toSignal(this.#breakpointObserver.observe([
        Breakpoints.Large,
        Breakpoints.XLarge,
        // Breakpoints.Tablet,
        Breakpoints.Web,
        Breakpoints.WebPortrait,
        // Breakpoints.HandsetLandscape,
        // Breakpoints.TabletLandscape,
        Breakpoints.WebLandscape,
      ]))()?.matches;
      this.isDesktop.set(!!isDesktopObserved);
      if (this.isMobile()) {
        this.title.set('Ali Roshanzamir | Portfolio');
      }
    }
  }

  scrollTo(element: HTMLElement | null) {
    if (isPlatformBrowser(this.#platformId)) {
      element?.scrollIntoView({
        behavior: 'smooth',
        block: "center",
      });
    }
  }

  get isBrowser() {
    return isPlatformBrowser(this.#platformId);
  }

  get isServer() {
    return isPlatformServer(this.#platformId);
  }

  private isUserAgentFromDesktop(ua: string) {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return !regex.test(ua);
  }

}
