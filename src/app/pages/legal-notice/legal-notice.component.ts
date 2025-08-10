import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-legal-notice',
  imports: [
    RouterLink
  ],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit {

  readonly #seoService = inject(SeoService);

  ngOnInit() {
    this.#seoService.updateCanonical('https://aliroshanzamir.info/legal-notice');
  }
}
