import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'book',
    title: 'Book a 1:1 Meeting | Ali Roshanzamir',
    loadComponent: () => import('@pages/book/book.component')
      .then(m => m.BookComponent)
  },
  {
    path: 'projects',
    title: 'Projects & Case Studies | Ali Roshanzamir',
    loadComponent: () => import('@pages/projects/projects.component')
      .then(m => m.ProjectsComponent)
  },
  {
    path: 'projects/:id',
    title: 'Project Detail | Ali Roshanzamir',
    loadComponent: () => import('@pages/projects/project-detail/project-detail.component')
      .then(m => m.ProjectDetailComponent)
  },
  {
    path: 'legal-notice',
    title: 'Ali Roshanzamir Golafzani | Legal Notice',
    loadComponent: () => import('@pages/legal-notice/legal-notice.component')
      .then(m => m.LegalNoticeComponent)
  },
  {
    path: '',
    title: 'Ali Roshanzamir Golafzani | Software Engineer, Angular and Go',
    loadComponent: () => import('@pages/home/home.component')
      .then(m => m.HomeComponent)
  }
];