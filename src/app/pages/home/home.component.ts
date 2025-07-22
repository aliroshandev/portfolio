import {Component, computed, inject} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {ActivatedRoute} from '@angular/router';
import {Headings} from '../../constants/const';
import {fadeInOut, fadeInUp} from '../../animations/animations';
import {NgOptimizedImage} from '@angular/common';

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
  route = inject(ActivatedRoute)
  title = computed(() => this.route.snapshot.title ?? "Ali Roshanzamir Golafzani | portfolio");
  protected readonly Headings = Headings;
}
