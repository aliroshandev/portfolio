import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink],
  templateUrl: './legal-notice.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit {
  readonly #seoService = inject(SeoService);

  ngOnInit() {
    this.#seoService.setPage({
      title: 'Ali Roshanzamir Golafzani | Legal Notice',
      description: "Legal disclosure and privacy information for Ali Roshanzamir Golafzani's professional portfolio website.",
      path: '/legal-notice',
    });
  }
}
