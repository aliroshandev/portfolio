import {Component, computed, HostListener, inject, OnInit, signal} from '@angular/core';
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
    if (this.#layoutService.isServer) {
      this.setSnippet(richSnippetJsonSchema);
    }
    // this.#layoutService.scrollTo();
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

  setSnippet(data?: any) {
    // if need .replace(/\//g, '\\/') to replace all / with \/
    const value = data ? JSON.stringify(data, null, 2) : '';
    const html = `<script type="application/ld+json">${value}</script>`;
    this.snippetScript.set(this.#sanitizer.bypassSecurityTrustHtml(html));
  }

}
