import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Actor} from "../../../../models/actor";
import {Pelicula} from "../../../../models/pelicula";
import {PeliculasService} from "../../../../services/peliculas.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-peliculas-actor',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './peliculas-actor.component.html',
  styleUrl: './peliculas-actor.component.css'
})
export class PeliculasActorComponent implements OnChanges {
  @Input() actorSeleccionado!: Actor;
  peliculas: Pelicula[] = [];

  constructor(
    private peliculasService: PeliculasService
  ) {}

  // Use ngOnChanges to detect when the actor is selected and load the relevant movies
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actorSeleccionado'] && this.actorSeleccionado) {
      this.loadPeliculasDelActor();
    }
  }

  // Load movies for the selected actor
  loadPeliculasDelActor() {
    this.peliculasService.getPeliculasPorActor(this.actorSeleccionado).subscribe((peliculas: Pelicula[]) => {
      this.peliculas = peliculas;
    });
  }
}
