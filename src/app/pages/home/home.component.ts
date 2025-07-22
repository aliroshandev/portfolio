import {Component, computed, inject} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {ActivatedRoute} from '@angular/router';
import {Headings} from '../../constants/const';
import {fadeInOut, fadeInUp} from '../../animations/animations';
import {NgOptimizedImage} from '@angular/common';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-home',
  imports: [
    NgIcon,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeInUp, fadeInOut]
})
export class HomeComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #themeService = inject(ThemeService);
  title = computed(() => this.#route.snapshot.title ?? "Ali Roshanzamir Golafzani | portfolio");
  themeMode = computed(this.#themeService.activeTheme);
  protected readonly Headings = Headings;
}
