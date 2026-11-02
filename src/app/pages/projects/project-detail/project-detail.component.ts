import {afterNextRender, Component, DestroyRef, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapArrowLeft, bootstrapArrowRight, bootstrapBuilding, bootstrapGraphUp,
  bootstrapCodeSlash, bootstrapSpeedometer2, bootstrapPeople,
  bootstrapGlobe, bootstrapDatabase, bootstrapCloud,
  bootstrapDiagram3, bootstrapTerminal, bootstrapTrophy,
  bootstrapGithub, bootstrapLink45deg, bootstrapCheck,
  bootstrapX, bootstrapTag, bootstrapCalendar
} from '@ng-icons/bootstrap-icons';
import {PERSON_ID, SeoService, SITE_URL} from '../../../services/seo.service';
import {PROJECTS, Project} from '../projects.data';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgIcon, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  viewProviders: [provideIcons({
    bootstrapArrowLeft, bootstrapArrowRight, bootstrapBuilding, bootstrapGraphUp,
    bootstrapCodeSlash, bootstrapSpeedometer2, bootstrapPeople,
    bootstrapGlobe, bootstrapDatabase, bootstrapCloud,
    bootstrapDiagram3, bootstrapTerminal, bootstrapTrophy,
    bootstrapGithub, bootstrapLink45deg, bootstrapCheck,
    bootstrapX, bootstrapTag, bootstrapCalendar
  })]
})
export class ProjectDetailComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #seo = inject(SeoService);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly project = signal<Project | null>(null);
  protected readonly loading = signal(true);

  constructor() {
    // Mermaid needs the browser, and is loaded only on these pages to keep the main bundle small.
    afterNextRender(async () => {
      if (!document.querySelector('pre.mermaid')) return;
      const {default: mermaid} = await import('mermaid');
      const [r, g, b] = getComputedStyle(document.body).backgroundColor.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
      mermaid.initialize({startOnLoad: false, theme: r + g + b < 384 ? 'dark' : 'neutral'});
      await mermaid.run({querySelector: 'pre.mermaid'});
    });
  }

  ngOnInit(): void {
    this.#route.paramMap.pipe(
      map(params => params.get('id')),
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe(id => {
      const found = PROJECTS.find(p => p.id === id);
      this.project.set(found ?? null);
      this.loading.set(false);

      if (found) {
        const url = `${SITE_URL}/projects/${found.id}`;
        const title = `${found.title} | Ali Roshanzamir`;
        this.#seo.setPage({
          title,
          description: `${found.tagline}. Case study by Ali Roshanzamir, with architecture and technical decisions.`,
          path: `/projects/${found.id}`,
          type: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                '@id': `${url}#article`,
                headline: found.title,
                description: found.tagline,
                url,
                mainEntityOfPage: url,
                image: `${SITE_URL}/assets/og-image.png`,
                inLanguage: 'en',
                dateModified: '2026-11-02',
                author: {'@id': PERSON_ID, '@type': 'Person', name: 'Ali Roshanzamir Golafzani', url: `${SITE_URL}/`},
                keywords: found.techStack.join(', '),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {'@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/`},
                  {'@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects`},
                  {'@type': 'ListItem', position: 3, name: found.title, item: url},
                ],
              },
            ],
          },
        });
      }
    });
  }
}