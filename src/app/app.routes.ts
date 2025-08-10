import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'legal-notice',
    title: 'Ali Roshanzamir Golafzani | Legal Notice',
    loadComponent: () => import('@pages/legal-notice/legal-notice.component')
      .then(m => m.LegalNoticeComponent)
  },
  {
    path: '',
    title: 'Ali Roshanzamir Golafzani | Portfolio',
    loadComponent: () => import('@pages/home/home.component')
      .then(m => m.HomeComponent)
  }
];
