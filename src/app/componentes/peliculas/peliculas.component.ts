import {Component, OnInit} from '@angular/core';
import {TablaPeliculasComponent} from "./componentes/tabla-peliculas/tabla-peliculas.component";
import {DetallePeliculasComponent} from "./componentes/detalle-peliculas/detalle-peliculas.component";
import {Pelicula} from "../../models/pelicula";

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    TablaPeliculasComponent,
    DetallePeliculasComponent
  ],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent {
  peliculaSeleccionada?: Pelicula;

  alSeleccionarPelicula(pelicula: Pelicula) {
    this.peliculaSeleccionada = pelicula;
  }


}
