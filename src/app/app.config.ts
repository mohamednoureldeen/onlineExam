import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BASE_URL } from 'auth-api';
import { provideStore } from '@ngrx/store';
import { authTokenReducer } from './core/layout/auth-layout/store/autth.reducer';
import { environment } from './core/enviroment/environment';



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    { provide: BASE_URL, useFactory: () => environment.apiUrl },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: 'top' }), withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideStore(
      { auth: authTokenReducer },
    )
]
};
