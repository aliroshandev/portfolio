import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeadingContents, Headings} from '../../constants/const';
import {fadeInOut, fadeInUp} from '../../animations/animations';
import {NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../services/theme.service';
import {PickRelatedHeadingOnScrollViewDirective} from '../../directives/pick-related-heading-on-scroll-view.directive';
import {LayoutService} from '../../services/layout.service';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    PickRelatedHeadingOnScrollViewDirective,
    NgIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeInUp, fadeInOut]
})
export class HomeComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #themeService = inject(ThemeService);
  readonly #layoutService = inject(LayoutService);
  title = computed(() => this.#route.snapshot.title ?? this.#layoutService.title());
  themeMode = computed(this.#themeService.activeTheme);
  headerHeight = computed(this.#layoutService.headerHeight);
  isDesktop = computed(this.#layoutService.isDesktop);
  protected readonly Headings = Headings;
  protected readonly HeadingContents = HeadingContents;
}
