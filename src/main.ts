import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Ajusta la ruta según corresponda
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Ajusta la ruta según corresponda
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule)
  ]
})
.catch(err => console.error(err));
