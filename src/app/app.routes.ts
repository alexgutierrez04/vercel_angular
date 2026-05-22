import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Servicios } from './components/servicios/servicios';
import { Contacto } from './components/contacto/contacto';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'servicios', component: Servicios },
  { path: 'contacto', component: Contacto },
  { path: '**', redirectTo: '' }
];