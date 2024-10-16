import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Actor} from "../../../../models/actor";
import {ActoresService} from "../../../../services/actores.service";

@Component({
  selector: 'app-listado-actores',
  standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf
    ],
  templateUrl: './listado-actores.component.html',
  styleUrl: './listado-actores.component.css'
})
export class ListadoActoresComponent implements OnInit{
  actores$!: Observable<Actor[]>;

  @Output() actorSeleccionado: EventEmitter<Actor> = new EventEmitter<Actor>();

  constructor(
    private actoresService: ActoresService
  ) {}

  ngOnInit(): void {
    this.actores$ = this.actoresService.getActores();
  }

  seleccionarActor(actor: Actor): void {
    this.actorSeleccionado.emit(actor);
  }

}
