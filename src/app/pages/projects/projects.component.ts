import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService, SITE_URL} from '../../services/seo.service';
import {PROJECTS} from './projects.data';


@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProjectsComponent implements OnInit {
  readonly #seo = inject(SeoService);

  protected readonly projects = PROJECTS;

  ngOnInit(): void {
    this.#seo.setPage({
      title: 'Projects & Case Studies | Ali Roshanzamir',
      description: 'Case studies from Ali Roshanzamir: a gamification campaign platform, Angular client applications, a trading dashboard, an e-commerce PWA and open source tools.',
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
