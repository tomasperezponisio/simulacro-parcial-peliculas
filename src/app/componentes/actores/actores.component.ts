import {Component, EventEmitter, Output} from '@angular/core';
import {ListadoActoresComponent} from "./componentes/listado-actores/listado-actores.component";
import {DetalleActorComponent} from "./componentes/detalle-actor/detalle-actor.component";
import {DetallePaisComponent} from "./componentes/detalle-pais/detalle-pais.component";
import {PeliculasActorComponent} from "./componentes/peliculas-actor/peliculas-actor.component";
import {Actor} from "../../models/actor";

@Component({
  selector: 'app-actores',
  standalone: true,
  imports: [
    ListadoActoresComponent,
    DetalleActorComponent,
    DetallePaisComponent,
    PeliculasActorComponent
  ],
  templateUrl: './actores.component.html',
  styleUrl: './actores.component.css'
})
export class ActoresComponent {
  actorSeleccionado!: Actor;

  @Output() actorSeleccionadoParaDetalle: EventEmitter<Actor> = new EventEmitter<Actor>();

  alSeleccionarUnActor(actor: Actor): void {
    console.log('Actor seleccionado: ', actor);

    this.actorSeleccionado = actor;
    this.actorSeleccionadoParaDetalle.emit(actor);
  }
}
