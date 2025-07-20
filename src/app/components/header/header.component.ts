import {Component, signal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {FormsModule} from '@angular/forms';

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
  themeToggleName = signal(false);
}
