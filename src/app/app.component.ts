import {Component, computed, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@components/header/header.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapGithub, bootstrapLinkedin, bootstrapFilePdf, bootstrapSend,
  bootstrapPhone, bootstrapChatText,
} from '@ng-icons/bootstrap-icons';
import {LayoutService} from './services/layout.service';
import {SeoService} from './services/seo.service';
import {richSnippetJsonSchema} from './constants/const';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [provideIcons({
    bootstrapGithub, bootstrapLinkedin, bootstrapFilePdf, bootstrapSend,
    bootstrapPhone, bootstrapChatText,
  })]
})
export class AppComponent implements OnInit {
  readonly #layoutService = inject(LayoutService);
  readonly #seo = inject(SeoService);

  isMobile = computed(() => this.#layoutService.isDesktop() !== undefined && !this.#layoutService.isDesktop());

  ngOnInit(): void {
    this.#seo.setJsonLd(richSnippetJsonSchema);
  }

  protected readonly contacts = [
    {href: 'tel:447351534063', icon: 'bootstrapPhone', label: 'Call'},
    {href: 'sms:447351534063?body=Hi%20Ali,%20I%20saw%20your%20Portfolio', icon: 'bootstrapChatText', label: 'Text'},
    {href: 'mailto:a76roshanzamir@gmail.com', icon: 'bootstrapSend', label: 'Email'},
    {href: 'https://github.com/aliroshandev', icon: 'bootstrapGithub', label: 'GitHub'},
    {href: 'https://linkedin.com/in/ali-roshan', icon: 'bootstrapLinkedin', label: 'LinkedIn'},
    {href: '/assets/ALI_ROSHAN_CV.pdf', icon: 'bootstrapFilePdf', label: 'CV'},
  ];
}
