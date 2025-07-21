import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Ali Roshanzamir Golafzani | Portfolio',
    loadComponent: () => import('@pages/home/home.component')
      .then(m => m.HomeComponent)
  }
];
