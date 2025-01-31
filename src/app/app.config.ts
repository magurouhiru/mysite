import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

import {
  FIREBASECONFIG_APIKEY,
  FIREBASECONFIG_APPID,
  FIREBASECONFIG_AUTHDOMAIN,
  FIREBASECONFIG_MEASUREMENTID,
  FIREBASECONFIG_MESSAGINGSENDERID,
  FIREBASECONFIG_PROJECTID,
  FIREBASECONFIG_STORAGEBUCKET,
} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: FIREBASECONFIG_APIKEY,
        authDomain: FIREBASECONFIG_AUTHDOMAIN,
        projectId: FIREBASECONFIG_PROJECTID,
        storageBucket: FIREBASECONFIG_STORAGEBUCKET,
        messagingSenderId: FIREBASECONFIG_MESSAGINGSENDERID,
        appId: FIREBASECONFIG_APPID,
        measurementId: FIREBASECONFIG_MEASUREMENTID,
      }),
    ),
    provideAnalytics(() => getAnalytics()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
};
