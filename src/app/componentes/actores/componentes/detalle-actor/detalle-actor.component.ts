import {Component, Input} from '@angular/core';
import {Actor} from "../../../../models/actor";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-detalle-actor',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './detalle-actor.component.html',
  styleUrl: './detalle-actor.component.css'
})
export class DetalleActorComponent {

  @Input() actorSeleccionado!: Actor;

}
