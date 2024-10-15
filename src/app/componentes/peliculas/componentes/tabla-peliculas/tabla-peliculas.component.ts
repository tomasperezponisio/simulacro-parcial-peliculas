import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pelicula} from "../../../../models/pelicula";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {PeliculasService} from "../../../../services/peliculas.service";

@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './tabla-peliculas.component.html',
  styleUrl: './tabla-peliculas.component.css'
})
export class TablaPeliculasComponent implements OnInit {
  peliculas$!: Observable<Pelicula[]>

  constructor(
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.peliculas$ = this.peliculasService.getPeliculas();
  }

  @Output() peliculaSeleccionada = new EventEmitter<Pelicula>();

  verDetalles(pelicula: Pelicula) {
    console.log(pelicula);
    this.peliculaSeleccionada.emit(pelicula);

  }
}
