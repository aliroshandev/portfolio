import {Component, computed, inject} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {FormsModule} from '@angular/forms';
import {ThemeService} from '../../services/theme.service';

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

  isLightTheme = computed(() => this.#themeService.activeTheme() === 'light');

  toggleThemeDarkMode() {
    this.#themeService.toggle();
  }
}
