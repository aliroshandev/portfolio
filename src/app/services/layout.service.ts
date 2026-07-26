import {inject, Injectable, makeStateKey, PLATFORM_ID, signal, TransferState, WritableSignal} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {USER_AGENT} from '../app.config.server';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({providedIn: 'root'})
export class LayoutService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #transferState = inject(TransferState);
  readonly #breakpointObserver = inject(BreakpointObserver);

  scrollY = signal<number>(0);
  isDesktop: WritableSignal<boolean | undefined> = signal(undefined);

  constructor() {
    if (this.isServer) {
      const ua = inject(USER_AGENT, {optional: true}) || 'Unknown';
      this.#transferState.set(makeStateKey<string>('user-agent'), ua);
      this.isDesktop.set(this.#isDesktopUA(ua));
    } else {
      const matches = toSignal(this.#breakpointObserver.observe([
        Breakpoints.Large, Breakpoints.XLarge, Breakpoints.Web,
        Breakpoints.WebPortrait, Breakpoints.WebLandscape,
      ]))()?.matches;
      this.isDesktop.set(!!matches);
    }
  }

  get isBrowser() { return isPlatformBrowser(this.#platformId); }
  get isServer() { return isPlatformServer(this.#platformId); }

  #isDesktopUA(ua: string) {
    return !/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  }
}
