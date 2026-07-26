import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-legal-notice',
  imports: [RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit {
  readonly #seoService = inject(SeoService);

  ngOnInit() {
    const title = 'Ali Roshanzamir Golafzani | Legal Notice';
    const desc = 'Legal disclosure and privacy information for Ali Roshanzamir Golafzani\'s professional portfolio website.';

    this.#seoService.setTitle(title);
    this.#seoService.setMetaDescription(desc);
    this.#seoService.setOgTags(title, desc);
    this.#seoService.updateCanonical('https://aliroshanzamir.info/legal-notice');
  }
}
