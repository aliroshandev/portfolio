import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {FormsModule} from '@angular/forms';
import {ThemeService} from '../../services/theme.service';
import {contacts, Headings} from '../../constants/const';
import {ActivatedRoute} from '@angular/router';
import {HeadingInterface} from '../../constants/types';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LayoutService} from '../../services/layout.service';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'header[app-header]',
  imports: [
    NgIcon,
    FormsModule,
    NgTemplateOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  readonly #themeService = inject(ThemeService);
  readonly #route = inject(ActivatedRoute);
  readonly #destroyRef = inject(DestroyRef);
  readonly #layoutService = inject(LayoutService);

  selectedBookmark = signal<HeadingInterface | undefined>(undefined);
  phoneNumber = '447351534063';
  isLightTheme = computed(() => this.#themeService.activeTheme() === 'light');
  isDesktop = computed(this.#layoutService.isDesktop);
  title = computed(this.#layoutService.title);

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
              this.#layoutService.scrollTo(document.getElementById(response));
              this.selectedBookmark.set(Headings.find(heading => heading.id === response))
              if (this.isDesktop()) {

              }
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

  protected readonly contacts = contacts('447351534063')
    .map((item, index) => ({
      ...item,
      className: (index > 0 && this.isDesktop()) ? `${item.className} ms-2` : item.className,
    }));
}
