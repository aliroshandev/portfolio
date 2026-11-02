import {Component, computed, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../services/theme.service';
import {LayoutService} from '../../services/layout.service';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapArrowRight,
  bootstrapAward,
  bootstrapBuilding,
  bootstrapCalendarMonth,
  bootstrapChevronRight,
  bootstrapCodeSlash,
  bootstrapGraphUp,
  bootstrapLink45deg,
  bootstrapPeople,
  bootstrapPerson,
  bootstrapTrophy,
  bootstrapSpeedometer2,
  bootstrapDiagram3
} from '@ng-icons/bootstrap-icons';
import {SeoService} from '../../services/seo.service';
import {aboutText, education, experiences, openSourceProjects, technicalSkills, profilePageSchema} from '../../constants/const';
import {SkillGraphComponent} from '@components/skill-graph/skill-graph.component';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, NgIcon, RouterLink, SkillGraphComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  viewProviders: [provideIcons({
    bootstrapCalendarMonth, bootstrapBuilding, bootstrapLink45deg,
    bootstrapCodeSlash, bootstrapAward, bootstrapPerson,
    bootstrapPeople, bootstrapGraphUp, bootstrapTrophy, bootstrapChevronRight,
    bootstrapArrowRight, bootstrapSpeedometer2, bootstrapDiagram3
  })]
})
export class HomeComponent implements OnInit {
  readonly #themeService = inject(ThemeService);
  readonly #layoutService = inject(LayoutService);
  readonly #seoService = inject(SeoService);

  themeMode = computed(this.#themeService.activeTheme);
  isDesktop = computed(this.#layoutService.isDesktop);

  protected readonly aboutText = aboutText;
  protected readonly experiences = experiences;
  protected readonly technicalSkills = technicalSkills;
  protected readonly openSourceProjects = openSourceProjects;
  protected readonly education = education;

  protected readonly aboutStats = [
    {value: '8', label: 'Years Experience'},
    {value: 'Angular', label: 'Main Framework'},
    {value: 'TypeScript', label: 'Main Language'}
  ];

  ngOnInit() {
    this.#seoService.setPage({
      title: 'Ali Roshanzamir Golafzani | Software Engineer',
      description: 'Software engineer with 8 years of paid experience in Angular and TypeScript, plus backend work in Go and PostgreSQL. See projects and work history.',
      path: '/',
      type: 'profile',
      jsonLd: profilePageSchema,
    });
  }
}
