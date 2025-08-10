import {Component, computed, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeadingContents, Headings, SkillsKeyTranslation} from '../../constants/const';
import {fadeInOut, fadeInUp} from '../../animations/animations';
import {KeyValuePipe, NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../services/theme.service';
import {PickRelatedHeadingOnScrollViewDirective} from '../../directives/pick-related-heading-on-scroll-view.directive';
import {LayoutService} from '../../services/layout.service';
import {NgIcon} from '@ng-icons/core';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    PickRelatedHeadingOnScrollViewDirective,
    NgIcon,
    KeyValuePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeInUp, fadeInOut]
})
export class HomeComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #themeService = inject(ThemeService);
  readonly #layoutService = inject(LayoutService);
  readonly #seoService = inject(SeoService);
  title = computed(() => this.#route.snapshot.title ?? this.#layoutService.title());
  themeMode = computed(this.#themeService.activeTheme);
  headerHeight = computed(this.#layoutService.headerHeight);
  isDesktop = computed(this.#layoutService.isDesktop);
  protected readonly Headings = Headings;
  protected readonly HeadingContents = HeadingContents;
  protected readonly SkillsKeyTranslation = SkillsKeyTranslation;

  ngOnInit() {
    this.#seoService.updateCanonical('https://aliroshanzamir.info');
  }

}
