import {Component, computed, inject} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {ActivatedRoute} from '@angular/router';
import {Headings} from '../../constants/const';

@Component({
  selector: 'app-home',
  imports: [
    NgIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  route = inject(ActivatedRoute)
  title = computed(() => this.route.snapshot.title ?? "Ali Roshanzamir Golafzani | portfolio");
  protected readonly Headings = Headings;
}
