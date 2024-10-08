import { Routes } from '@angular/router';
import {PeliculasComponent} from "./componentes/peliculas/peliculas.component";
import {AltaPeliculaComponent} from "./componentes/alta-pelicula/alta-pelicula.component";
import {ActoresComponent} from "./componentes/actores/actores.component";
import {AltaActorComponent} from "./componentes/alta-actor/alta-actor.component";

export const routes: Routes = [
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'altapelicula', component: AltaPeliculaComponent},
  {path: 'actores', component: ActoresComponent},
  {path: "altaactor", component: AltaActorComponent},
];
