import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {FormsModule} from '@angular/forms';
import {ThemeService} from '../../services/theme.service';
import {Headings} from '../../constants/const';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadingInterface} from '../../constants/types';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LayoutService} from '../../services/layout.service';

@Component({
  selector: 'header[app-header]',
  imports: [
    NgIcon,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  readonly #themeService = inject(ThemeService);
  readonly #route = inject(ActivatedRoute);
  readonly #destroyRef = inject(DestroyRef);
  readonly #layoutService = inject(LayoutService);

  selectedBookmark = signal<HeadingInterface | null>(null);

  phoneNumber = '447351534063';
  isLightTheme = computed(() => this.#themeService.activeTheme() === 'light');

  toggleThemeDarkMode() {
    this.#themeService.toggle();
  }

  protected readonly Headings = Headings;

  ngOnInit(): void {
    this.#route
      .fragment
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: response => {
          if (response) {
            if (this.#layoutService.isBrowser) {
              this.#layoutService.scrollTo(document.getElementById(response))
            }
          }
        }
      })
    // const url = new URL(this.#router.url);
    // if (url) {
    //   console.log(url);
    //   console.log(this.#route.snapshot.fragment);
    // }
  }
}
