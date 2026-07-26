import {inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({providedIn: 'root'})
export class ThemeService {
  activeTheme: WritableSignal<'dark' | 'light'> = signal('light');
  readonly #platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.#platformId)) {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.activeTheme.set(stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light');
      this.#apply();
    }
  }

  toggle() {
    this.activeTheme.update(t => t === 'dark' ? 'light' : 'dark');
    this.#apply();
  }

  #apply() {
    if (isPlatformBrowser(this.#platformId)) {
      localStorage.setItem('theme', this.activeTheme());
      document.documentElement.setAttribute('data-theme', this.activeTheme());
    }
  }
}
