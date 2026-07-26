import {DOCUMENT, inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LayoutService} from './layout.service';

@Injectable({providedIn: 'root'})
export class SeoService {
  readonly #document = inject(DOCUMENT);
  readonly #title = inject(Title);
  readonly #layoutService = inject(LayoutService);

  setTitle(title: string) {
    this.#title.setTitle(title);
  }

  setMetaDescription(description: string) {
    let tag = this.#document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = this.#document.createElement('meta');
      tag.setAttribute('name', 'description');
      this.#document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }

  updateCanonical(url: string) {
    let link = this.#document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.#document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setOgTags(title: string, description: string, image?: string) {
    const setMeta = (property: string, content: string) => {
      const selector = `meta[property="${property}"]`;
      let tag = this.#document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = this.#document.createElement('meta');
        tag.setAttribute('property', property);
        this.#document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', 'https://aliroshanzamir.info');
    if (image) setMeta('og:image', image);
  }

  setJsonLd(data: Record<string, unknown>) {
    const existing = this.#document.querySelector('script[type="application/ld+json"]');
    if (existing) existing.remove();
    const script = this.#document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    this.#document.head.appendChild(script);
  }
}
