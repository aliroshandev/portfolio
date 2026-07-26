import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration, withHttpTransferCacheOptions} from '@angular/platform-browser';
import {provideNgIconLoader} from '@ng-icons/core';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {shareReplay} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes,
      withInMemoryScrolling(),
      withRouterConfig({onSameUrlNavigation: 'reload'})
    ),
    provideAnimations(),
    provideClientHydration(
      withHttpTransferCacheOptions({includePostRequests: true})
    ),
    provideHttpClient(withFetch()),
    provideNgIconLoader((name) => {
      const http = inject(HttpClient);
      return http.get(`/assets/icons/${name}.svg`, {responseType: "text"}).pipe(shareReplay(1));
    }),
  ]
};
