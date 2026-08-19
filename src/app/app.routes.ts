import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'book',
    title: 'Book a 1:1 Meeting | Ali Roshanzamir',
    loadComponent: () => import('@pages/book/book.component')
      .then(m => m.BookComponent)
  },
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
