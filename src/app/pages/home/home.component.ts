import {Component, computed, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../services/theme.service';
import {LayoutService} from '../../services/layout.service';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapCalendar, bootstrapBuilding, bootstrapLink45deg,
  bootstrapCodeSlash, bootstrapAward, bootstrapPerson,
} from '@ng-icons/bootstrap-icons';
import {SeoService} from '../../services/seo.service';
import {experiences, technicalSkills, aboutText} from '../../constants/const';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, NgIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  viewProviders: [provideIcons({
    bootstrapCalendar, bootstrapBuilding, bootstrapLink45deg,
    bootstrapCodeSlash, bootstrapAward, bootstrapPerson,
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

  ngOnInit() {
    const title = 'Ali Roshanzamir Golafzani | Frontend Engineer & Angular Specialist';
    const desc = 'Frontend Architect with 7+ years experience building enterprise web solutions. Angular specialist, React developer, SSR/PWA expert. View my portfolio, experience, and technical skills.';

    this.#seoService.setTitle(title);
    this.#seoService.setMetaDescription(desc);
    this.#seoService.setOgTags(title, desc, 'https://aliroshanzamir.info/assets/profile-light.png');
    this.#seoService.updateCanonical('https://aliroshanzamir.info');
  }
}
