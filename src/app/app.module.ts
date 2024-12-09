import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule

import { routes } from './app.routes'; // Importa las rutas desde tu archivo de rutas

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // Configura las rutas
  ],
  providers: [],
  bootstrap: [] // No necesitamos bootstrap aquí, ya que estamos usando componentes standalone
})
export class AppModule { }
