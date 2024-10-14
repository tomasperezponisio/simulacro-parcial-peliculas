import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Actor} from "../../../../models/actor";
import {ActoresService} from "../../../../services/actores.service";

@Component({
  selector: 'app-tabla-actores',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './tabla-actores.component.html',
  styleUrl: './tabla-actores.component.css'
})
export class TablaActoresComponent implements OnInit{
  actores$!: Observable<Actor[]>;

  @Output() actorSeleccionado = new EventEmitter<Actor>();

  constructor(
    private actoresService: ActoresService
  ) {}

  ngOnInit(): void {
    this.actores$ = this.actoresService.getActores();
  }

  seleccionarActor(actor: Actor) {
    console.log('Actor seleccionado:', actor);
    this.actorSeleccionado.emit(actor);
  }

}
