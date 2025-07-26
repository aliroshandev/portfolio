import {Component, computed, effect, inject} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {ActivatedRoute} from '@angular/router';
import {Headings} from '../../constants/const';
import {fadeInOut, fadeInUp} from '../../animations/animations';
import {NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../services/theme.service';
import {PickRelatedHeadingOnScrollViewDirective} from '../../directives/pick-related-heading-on-scroll-view.directive';
import {LayoutService} from '../../services/layout.service';

@Component({
  selector: 'app-home',
  imports: [
    NgIcon,
    NgOptimizedImage,
    PickRelatedHeadingOnScrollViewDirective
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
  protected readonly Headings = Headings;
}
