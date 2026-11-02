import {DOCUMENT, inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

export const SITE_URL = 'https://aliroshanzamir.info';
export const PERSON_ID = `${SITE_URL}/#person`;

const SHARE_IMAGE = `${SITE_URL}/assets/og-image.png`;
const SHARE_IMAGE_ALT = 'Ali Roshanzamir Golafzani, Software Engineer';
const PERSON_FIRST_NAME = 'Ali';
const PERSON_LAST_NAME = 'Roshanzamir Golafzani';

export interface PageSeo {
  title: string;
  description: string;
  /** Path from the site root, such as `/projects`. The home page is `/`. */
  path: string;
  type?: 'website' | 'profile' | 'article';
  /** Page-level JSON-LD. Any block left by the previous page is removed when this is omitted. */
  jsonLd?: Record<string, unknown>;
  /** Keeps pages such as the 404 page out of search results. */
  noindex?: boolean;
}

@Injectable({providedIn: 'root'})
export class SeoService {
  readonly #document = inject(DOCUMENT);
  readonly #title = inject(Title);

  /** Sets every per-page tag together, so no tag can be left over from the previous route. */
  setPage({title, description, path, type = 'website', jsonLd, noindex = false}: PageSeo) {
    const url = `${SITE_URL}${path}`;

    this.#title.setTitle(title);
    this.#setMeta('name', 'description', description);
    this.#setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow, max-image-preview:large');
    this.#setCanonical(url);

    this.#setMeta('property', 'og:type', type);
    this.#setMeta('property', 'og:url', url);
    this.#setMeta('property', 'og:title', title);
    this.#setMeta('property', 'og:description', description);
    this.#setMeta('property', 'og:image', SHARE_IMAGE);
    this.#setMeta('property', 'og:image:alt', SHARE_IMAGE_ALT);

    this.#setMeta('name', 'twitter:title', title);
    this.#setMeta('name', 'twitter:description', description);
    this.#setMeta('name', 'twitter:image', SHARE_IMAGE);
    this.#setMeta('name', 'twitter:image:alt', SHARE_IMAGE_ALT);

    // profile:* belongs only on pages whose og:type is profile.
    if (type === 'profile') {
      this.#setMeta('property', 'profile:first_name', PERSON_FIRST_NAME);
      this.#setMeta('property', 'profile:last_name', PERSON_LAST_NAME);
    } else {
      this.#removeMeta('property', 'profile:first_name');
      this.#removeMeta('property', 'profile:last_name');
    }

    if (jsonLd) {
      this.setJsonLd(jsonLd, 'page');
    } else {
      this.#jsonLdScript('page')?.remove();
    }
  }

  /** Each key holds one JSON-LD block: `site` for the whole site, `page` for the current route. */
  setJsonLd(data: Record<string, unknown>, key: 'site' | 'page' = 'site') {
    this.#jsonLdScript(key)?.remove();
    const script = this.#document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo', key);
    script.textContent = JSON.stringify(data);
    this.#document.head.appendChild(script);
  }

  #jsonLdScript(key: string) {
    return this.#document.querySelector(`script[type="application/ld+json"][data-seo="${key}"]`);
  }

  #setCanonical(url: string) {
    let link = this.#document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.#document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  #setMeta(attribute: 'name' | 'property', key: string, content: string) {
    let tag = this.#document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!tag) {
      tag = this.#document.createElement('meta');
      tag.setAttribute(attribute, key);
      this.#document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  #removeMeta(attribute: 'name' | 'property', key: string) {
    this.#document.querySelector(`meta[${attribute}="${key}"]`)?.remove();
  }
}
