import {inject, Injectable, PLATFORM_ID, Signal, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  readonly #platformId = inject(PLATFORM_ID);

  scrollY = signal<number>(0);
  headerHeight: Signal<number> = signal<number>(76).asReadonly();

  scrollTo(element: HTMLElement | null) {
    if (isPlatformBrowser(this.#platformId)) {
      element?.scrollIntoView({
        behavior: 'smooth',
        block: "start"
      });
    }
  }

  get isBrowser() {
    return isPlatformBrowser(this.#platformId);
  }

  get isServer() {
    return isPlatformBrowser(this.#platformId);
  }

}
