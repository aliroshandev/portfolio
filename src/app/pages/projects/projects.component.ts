import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapArrowRight, bootstrapBuilding, bootstrapGraphUp,
  bootstrapCodeSlash, bootstrapSpeedometer2, bootstrapPeople,
  bootstrapGlobe, bootstrapDatabase, bootstrapCloud,
  bootstrapDiagram3, bootstrapTerminal, bootstrapTrophy
} from '@ng-icons/bootstrap-icons';
import {SeoService, SITE_URL} from '../../services/seo.service';
import {PROJECTS} from './projects.data';


@Component({
  selector: 'app-projects',
  imports: [NgIcon, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  viewProviders: [provideIcons({
    bootstrapArrowRight, bootstrapBuilding, bootstrapGraphUp,
    bootstrapCodeSlash, bootstrapSpeedometer2, bootstrapPeople,
    bootstrapGlobe, bootstrapDatabase, bootstrapCloud,
    bootstrapDiagram3, bootstrapTerminal, bootstrapTrophy
  })]
})
export class ProjectsComponent implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly projects = PROJECTS;

  ngOnInit(): void {
    this.#seo.setPage({
      title: 'Projects & Case Studies | Ali Roshanzamir',
      description: 'Case studies from Ali Roshanzamir: Angular client applications, a real-time trading dashboard, an e-commerce PWA and open source Angular tools.',
      path: '/projects',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/`},
          {'@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects`},
        ],
      },
    });
  }
}
