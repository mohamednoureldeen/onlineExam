import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BASE_URL } from 'auth-api';



export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(withFetch()),
    { provide: BASE_URL, useValue: 'https://exam.elevateegy.com/api/v1/auth' },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withViewTransitions() ,withInMemoryScrolling({ scrollPositionRestoration: 'top' }),withHashLocation()), 
    provideClientHydration(withEventReplay())
  ]
};
