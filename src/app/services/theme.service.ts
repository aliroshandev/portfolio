import {Host, HostListener, inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  activeTheme: WritableSignal<"dark" | "light"> = signal<"dark" | "light">("light");
  #platformId: Object = inject(PLATFORM_ID);

  constructor() {
    this.bindThemeInLogic();
  }

  toggle() {
    this.activeTheme.update(oldTheme => oldTheme === 'dark' ? 'light' : 'dark');
    this.bindThemeModeIntoDom();
  }

  bindThemeInLogic(): void {
    if (isPlatformBrowser(this.#platformId)) {
      if (localStorage.getItem('theme') === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        this.activeTheme.set('dark');
      } else {
        this.activeTheme.set('light');
      }
      this.bindThemeModeIntoDom();
    }
  }

  bindThemeModeIntoDom(): void {
    if (isPlatformBrowser(this.#platformId)) {
      localStorage.setItem('theme', this.activeTheme());
      document.documentElement.setAttribute('data-theme', this.activeTheme());
    }
  }

}
