import {provideServerRendering, withRoutes} from '@angular/ssr';
import {ApplicationConfig, InjectionToken, mergeApplicationConfig} from '@angular/core';
import {appConfig} from './app.config';
import {serverRoutes} from './app.routes.server';

export const USER_AGENT: InjectionToken<string> = new InjectionToken<string>('USER_AGENT');

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: USER_AGENT,
      useValue: (globalThis as any).userAgent
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
