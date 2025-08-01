import {Component, computed, HostListener, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '@components/header/header.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  bootstrapCalendar,
  bootstrapFilePdf,
  bootstrapGithub, bootstrapLink45deg,
  bootstrapLinkedin,
  bootstrapMoon,
  bootstrapPhone,
  bootstrapSend,
  bootstrapSun,
  bootstrapThreeDotsVertical,
} from '@ng-icons/bootstrap-icons';
import {LayoutService} from './services/layout.service';
import {contacts} from './constants/const';

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
    })
  ],
})
export class AppComponent implements OnInit{

  readonly #layoutService = inject(LayoutService);
  scrollTop = computed(this.#layoutService.scrollY);
  isMobile = computed(this.#layoutService.isMobile);
  phoneNumber = computed(this.#layoutService.phoneNumber);

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
    // this.#layoutService.scrollTo();
    if (this.#layoutService.isBrowser) {
      document.getElementsByTagName('header')[0].scrollIntoView({
        behavior: 'instant',
        block: "start"
      })
    }
  }

  protected readonly contacts = contacts(this.phoneNumber())
    .map((item, index) => ({
      ...item,
      className: item.className.replace(' btn-soft', '')
    }));
}
