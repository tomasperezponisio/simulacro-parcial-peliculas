import {Routes} from '@angular/router';
import {authGuardGuard} from "./guards/auth-guard.guard";
import {AltaActorComponent} from "./componentes/alta-actor/alta-actor.component";
import {AltaPeliculaComponent} from "./componentes/alta-pelicula/alta-pelicula.component";

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./componentes/peliculas/peliculas.component')
      .then(c => c.PeliculasComponent), pathMatch: "full"
  },
  {
    path: 'peliculas', loadComponent: () => import('./componentes/peliculas/peliculas.component')
      .then(c => c.PeliculasComponent)
  },
  {
    path: 'actores', loadComponent: () => import('./componentes/actores/actores.component')
      .then(c => c.ActoresComponent)
  },
  {
    path: 'login', loadComponent: () => import('./componentes/login/login.component')
      .then(c => c.LoginComponent)
  },
  {
    path: 'register', loadComponent: () => import('./componentes/register/register.component')
      .then(c => c.RegisterComponent)
  },
  {
    path: "altaactor",
    data: {midata: "datos de ruta"},
    component: AltaActorComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: "altapelicula",
    data: {midata: "datos de ruta"},
    component: AltaPeliculaComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'error', loadComponent: () => import('./componentes/error-page/error-page.component')
      .then(c => c.ErrorPageComponent)
  },
  {
    path: '**', loadComponent: () => import('./componentes/error-page/error-page.component')
      .then(c => c.ErrorPageComponent)
  },
];
