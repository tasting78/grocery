// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import withFetch

import { routes } from './app/app.routes';
import { environment } from './environments/environment'; // Import environment

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()) // Enable fetch API
  ],
}).catch(err => console.error(err));