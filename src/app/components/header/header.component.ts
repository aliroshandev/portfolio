import {Component, computed, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {ThemeService} from '../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LayoutService} from '../../services/layout.service';
import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  bootstrapGithub, bootstrapLinkedin, bootstrapFilePdf, bootstrapSend,
  bootstrapPhone, bootstrapMoon, bootstrapSun, bootstrapThreeDotsVertical, bootstrapX,
  bootstrapCalendarMonth,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'header[app-header]',
  imports: [NgIcon, RouterLink],
  host: {'[class.scrolled]': 'scrolled()'},
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  viewProviders: [provideIcons({
    bootstrapGithub, bootstrapLinkedin, bootstrapFilePdf, bootstrapSend,
    bootstrapPhone, bootstrapMoon, bootstrapSun, bootstrapThreeDotsVertical, bootstrapX,
    bootstrapCalendarMonth,
  })]
})
export class HeaderComponent {
  readonly #themeService = inject(ThemeService);
  readonly #route = inject(ActivatedRoute);
  readonly #layoutService = inject(LayoutService);

  isLightTheme = computed(() => this.#themeService.activeTheme() === 'light');
  isDesktop = computed(this.#layoutService.isDesktop);
  isMobileMenuOpen = signal(false);
  scrolled = signal(false);

  protected readonly sections = [
    {id: 'about', label: 'About'},
    {id: 'experience', label: 'Experience'},
    {id: 'skills', label: 'Skills'},
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      fromEvent(window, 'scroll')
        .pipe(
          map(() => window.scrollY > 10),
          takeUntilDestroyed()
        )
        .subscribe(v => this.scrolled.set(v));
    }

    this.#route.fragment.pipe(takeUntilDestroyed()).subscribe(fragment => {
      if (fragment) {
        document.getElementById(fragment)?.scrollIntoView({behavior: 'smooth'});
      }
    });
  }

  toggleTheme() {
    this.#themeService.toggle();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
