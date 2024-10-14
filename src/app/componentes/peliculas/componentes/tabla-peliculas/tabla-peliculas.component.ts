import {Component, EventEmitter, Output} from '@angular/core';
import {Pelicula} from "../../../../models/pelicula";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './tabla-peliculas.component.html',
  styleUrl: './tabla-peliculas.component.css'
})
export class TablaPeliculasComponent {

  peliculas: Pelicula[] = [
    {
      // id: 1,
      nombre: 'The Shining',
      tipo: 'terror',
      fechaEstreno: new Date('1980-05-23'),
      cantidadPublico: 1000,
      imagen: 'theshining.jpg',
      protagonista: 'Jack Nicholson'
    },
    {
      // id: 2,
      nombre: 'Superbad',
      tipo: 'comedia',
      fechaEstreno: new Date('2007-08-17'),
      cantidadPublico: 800,
      imagen: 'superbad.jpg',
      protagonista: 'Jonah Hill'
    },
    {
      // id: 3,
      nombre: 'Titanic',
      tipo: 'amor',
      fechaEstreno: new Date('1997-12-19'),
      cantidadPublico: 2000,
      imagen: 'titanic.jpg',
      protagonista: 'Leonardo DiCaprio'
    },
    {
      // id: 4,
      nombre: 'The Matrix',
      tipo: 'otros',
      fechaEstreno: new Date('1999-03-31'),
      cantidadPublico: 1500,
      imagen: 'thematrix.jpg',
      protagonista: 'Keanu Reeves'
    }
  ];

  @Output() peliculaSeleccionada = new EventEmitter<Pelicula>();

  verDetalles(pelicula: Pelicula) {
    console.log(pelicula);
    this.peliculaSeleccionada.emit(pelicula);

  }
}
