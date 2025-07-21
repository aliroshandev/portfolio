import {Component, computed, inject} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {FormsModule} from '@angular/forms';
import {ThemeService} from '../../services/theme.service';
import {Headings} from '../../constants/const';

@Component({
  selector: 'header[app-header]',
  imports: [
    NgIcon,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  readonly #themeService = inject(ThemeService);

  phoneNumber = '447351534063';
  isLightTheme = computed(() => this.#themeService.activeTheme() === 'light');

  toggleThemeDarkMode() {
    this.#themeService.toggle();
  }

  protected readonly Headings = Headings;
}
