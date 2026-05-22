import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Servicios } from './components/servicios/servicios';
import { Contacto } from './components/contacto/contacto';
import { Galeria } from './components/servicios/galeria/galeria';
import { Blog } from './components/servicios/blog/blog';

/**
 * Rutas principales de la SPA.
 * - Rutas de primer nivel: Inicio, Servicios y Contacto
 * - Rutas hijas en Servicios: Galería y Blog (router-outlet anidado)
 * - Comodín: redirige rutas desconocidas al inicio
 */
export const routes: Routes = [
  {
    path: '',
    component: Inicio,
    title: 'Inicio | Práctica Angular',
  },
  {
    path: 'servicios',
    component: Servicios,
    title: 'Servicios | Práctica Angular',
    children: [
      { path: '', redirectTo: 'galeria', pathMatch: 'full' },
      { path: 'galeria', component: Galeria, title: 'Galería | Servicios' },
      { path: 'blog', component: Blog, title: 'Blog | Servicios' },
    ],
  },
  {
    path: 'contacto',
    component: Contacto,
    title: 'Contacto | Práctica Angular',
  },
  { path: '**', redirectTo: '' },
];
