import {Component, computed, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@components/header/header.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapGithub, bootstrapLinkedin, bootstrapFilePdf, bootstrapEnvelope,
  bootstrapPhone, bootstrapChatText,
} from '@ng-icons/bootstrap-icons';
import {LayoutService} from './services/layout.service';
import {SeoService} from './services/seo.service';
import {siteSchema} from './constants/const';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  viewProviders: [provideIcons({
    bootstrapGithub, bootstrapLinkedin, bootstrapFilePdf, bootstrapEnvelope,
    bootstrapPhone, bootstrapChatText,
  })]
})
export class AppComponent implements OnInit {
  readonly #layoutService = inject(LayoutService);
  readonly #seo = inject(SeoService);

  isMobile = computed(() => this.#layoutService.isDesktop() !== undefined && !this.#layoutService.isDesktop());

  ngOnInit(): void {
    this.#seo.setJsonLd(siteSchema);
  }

  protected readonly contacts = [
    {href: 'tel:+989031751739', icon: 'bootstrapPhone', label: 'Call'},
    {href: 'sms:+989031751739?body=Hi%20Ali,%20I%20saw%20your%20Portfolio', icon: 'bootstrapChatText', label: 'Text'},
    {href: 'mailto:a76roshanzamir@gmail.com', icon: 'bootstrapEnvelope', label: 'Email'},
    {href: 'https://github.com/aliroshandev', icon: 'bootstrapGithub', label: 'GitHub'},
    {href: 'https://www.linkedin.com/in/ali-roshan', icon: 'bootstrapLinkedin', label: 'LinkedIn'},
    {href: '/assets/ALI_ROSHAN_CV.pdf', icon: 'bootstrapFilePdf', label: 'CV'},
  ];
}
