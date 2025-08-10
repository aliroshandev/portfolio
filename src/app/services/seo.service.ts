import {DOCUMENT, inject, Injectable} from '@angular/core';
import {LayoutService} from './layout.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  readonly #document = inject(DOCUMENT);
  readonly #layoutService = inject(LayoutService);


  selectTag(selector: string) {
    return this.#document.querySelector(selector);
  }

  updateCanonical(canonicalValue: string) {
    const canonicalTag = this.selectTag('link[rel="canonical"]');
    if (canonicalTag) {
      (canonicalTag as HTMLLinkElement).setAttribute('href', canonicalValue);
    } else {
      const canonicalTag = this.#document.createElement('link');
      (canonicalTag as HTMLLinkElement).setAttribute('rel', 'canonical');
      (canonicalTag as HTMLLinkElement).setAttribute('href', canonicalValue);
      this.#document.head.appendChild(canonicalTag);
    }
  }
}
