import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p class="text-sm font-medium text-[var(--color-primary)]">404</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Page not found</h1>
      <p class="mt-3 text-base text-[var(--color-fg-secondary)]">This page doesn't exist or has moved.</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <a routerLink="/" class="btn-primary">Go to home page</a>
        <a routerLink="/projects" class="btn-soft">View projects</a>
      </div>
    </section>
  `,
})
export class NotFoundComponent implements OnInit {
  readonly #seo = inject(SeoService);

  ngOnInit() {
    this.#seo.setPage({
      title: 'Page Not Found | Ali Roshanzamir',
      description: 'This page does not exist.',
      path: '/404',
      noindex: true,
    });
  }
}
