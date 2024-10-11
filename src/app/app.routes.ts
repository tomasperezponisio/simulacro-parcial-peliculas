import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent:() => import('./componentes/peliculas/peliculas.component')
      .then(c => c.PeliculasComponent), pathMatch: "full"},
  {path: 'peliculas', loadComponent:() => import('./componentes/peliculas/peliculas.component')
      .then(c => c.PeliculasComponent)},
  {path: 'altapelicula', loadComponent:() => import('./componentes/alta-pelicula/alta-pelicula.component')
      .then(c => c.AltaPeliculaComponent)},
  {path: 'actores', loadComponent:() => import('./componentes/actores/actores.component')
      .then(c => c.ActoresComponent)},
  {path: 'altaactor', loadComponent:() => import('./componentes/alta-actor/alta-actor.component')
      .then(c => c.AltaActorComponent)},
];
