import {Component, computed, DOCUMENT, HostListener, inject, OnInit, Renderer2, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@components/header/header.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapCalendar,
  bootstrapChatText,
  bootstrapFilePdf,
  bootstrapGithub,
  bootstrapLink45deg,
  bootstrapLinkedin,
  bootstrapMoon,
  bootstrapPhone,
  bootstrapSend,
  bootstrapSun,
  bootstrapThreeDotsVertical,
} from '@ng-icons/bootstrap-icons';
import {LayoutService} from './services/layout.service';
import {contacts, richSnippetJsonSchema} from './constants/const';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ScriptLoaderService} from './services/script-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [
    provideIcons({
      bootstrapLinkedin,
      bootstrapPhone,
      bootstrapCalendar,
      bootstrapGithub,
      bootstrapSun,
      bootstrapMoon,
      bootstrapFilePdf,
      bootstrapSend,
      bootstrapThreeDotsVertical,
      bootstrapLink45deg,
      bootstrapChatText,
    })
  ],
})
export class AppComponent implements OnInit {

  readonly #layoutService = inject(LayoutService);
  readonly #sanitizer = inject(DomSanitizer);
  readonly #document = inject(DOCUMENT);
  readonly renderer = inject(Renderer2);
  readonly #scriptLoader = inject(ScriptLoaderService);

  scrollTop = computed(this.#layoutService.scrollY);
  isMobile = computed(this.#layoutService.isMobile);
  phoneNumber = computed(this.#layoutService.phoneNumber);
  email = computed(this.#layoutService.email);
  snippetScript = signal<SafeHtml>('');


  @HostListener('window:scroll', ['$event']) windowScroll() {
    this.#layoutService.scrollY.set(window.scrollY);
    if (this.#layoutService.isBrowser) {
      const headerElement = document.getElementsByTagName('header').item(0);
      const conditionToToggleClass = this.scrollTop() > 100;
      headerElement?.classList.toggle('position-sticky', conditionToToggleClass);
      headerElement?.classList.toggle('top-0', conditionToToggleClass);
    }
  }

  ngOnInit(): void {
    this.insertNoScriptGATag();
    this.setOrUpdateSnippet();
    if (this.#layoutService.isBrowser) {
      document.getElementsByTagName('header')[0].scrollIntoView({
        behavior: 'instant',
        block: "start"
      })
    }
  }

  protected readonly contacts = contacts(this.phoneNumber(), this.email())
    .map((item, index) => ({
      ...item,
      className: item.className.replace(' btn-soft', '')
    }));

  setOrUpdateSnippet() {
    const value = JSON.stringify(richSnippetJsonSchema, null, 2);
    const html = this.#sanitizer.bypassSecurityTrustHtml(`<script type="application/ld+json">${value}</script>`);
    if (this.#layoutService.isServer) {
      this.snippetScript.set(html);
    } else {
      const element = this.#document.querySelector('script[type="application/ld+json"]');
      const schemaJson = JSON.stringify(richSnippetJsonSchema, null, 2);
      this.snippetScript.set(html);
      if (element != null) {
        this.renderer.setValue(
          this.#document.querySelector('script[type="application/ld+json"]'),
          schemaJson
        )
      } else {
        const scriptElement = this.renderer.createElement('script');
        scriptElement.type = `application/ld+json`;
        scriptElement.text = schemaJson;
        this.renderer.appendChild(this.#document.body, this.#sanitizer.bypassSecurityTrustHtml(scriptElement));
      }
    }
  }

  private insertNoScriptGATag() {
    // Google Tag Manager (noscript)
    const noScript = this.#document.createElement('noscript');
    const iframe = this.#document.createElement('iframe');
    iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-TJKJCP4D";
    iframe.width = "0";
    iframe.height = "0";
    iframe.style = "display:none;visibility:hidden";
    this.renderer.appendChild(noScript, iframe);
    this.#document.body.prepend(noScript);
    // End Google Tag Manager (noscript)
  }
}
