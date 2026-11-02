import { RenderMode, ServerRoute } from '@angular/ssr';

// Keep in sync with PROJECTS in project-detail.component.ts and with public/sitemap-config.xml.
const PROJECT_IDS = [
  'gamify-platform',
  'kheir-iran',
  'filter-app',
  'rezervno',
  'bvasett',
  'rou-dar-rou',
  'tabintech-platform',
  'agatizer-trading',
  'missha-pwa',
  'angular-lazy-load',
  'angular-lifecycles',
];

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'projects/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECT_IDS.map(id => ({id}))
  },
  {path: 'projects', renderMode: RenderMode.Prerender},
  {path: 'book', renderMode: RenderMode.Prerender},
  {path: 'legal-notice', renderMode: RenderMode.Prerender},
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
