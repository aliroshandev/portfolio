import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {bootstrapLinkedin, bootstrapPhone, bootstrapCalendar, bootstrapGithub, bootstrapSun, bootstrapMoon} from '@ng-icons/bootstrap-icons';

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
      bootstrapMoon
    })
  ]
})
export class AppComponent {
  title = 'Ali Roshanzamir Golafzani';
}
