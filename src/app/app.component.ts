import {Component, computed, HostListener, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@components/header/header.component';
import {provideIcons} from '@ng-icons/core';
import {
  bootstrapCalendar,
  bootstrapFilePdf,
  bootstrapGithub,
  bootstrapLinkedin,
  bootstrapMoon,
  bootstrapPhone,
  bootstrapSend,
  bootstrapSun
} from '@ng-icons/bootstrap-icons';
import {LayoutService} from './services/layout.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
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
    })
  ],
})
export class AppComponent {

  readonly #layoutService = inject(LayoutService);
  scrollTop = computed(this.#layoutService.scrollY);

  @HostListener('window:scroll', ['$event']) windowScroll() {
    this.#layoutService.scrollY.set(window.scrollY);
    if (this.#layoutService.isBrowser) {
      const headerElement = document.getElementsByTagName('header').item(0);
      const conditionToToggleClass = this.scrollTop() > 100;
      headerElement?.classList.toggle('position-sticky', conditionToToggleClass);
      headerElement?.classList.toggle('top-0', conditionToToggleClass);
    }
  }
}
