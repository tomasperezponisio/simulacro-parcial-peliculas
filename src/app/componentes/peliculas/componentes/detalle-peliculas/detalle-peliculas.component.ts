import {Component, Input} from '@angular/core';
import {Pelicula} from "../../../../models/pelicula";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-detalle-peliculas',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './detalle-peliculas.component.html',
  styleUrl: './detalle-peliculas.component.css'
})
export class DetallePeliculasComponent {
  @Input() pelicula?: Pelicula;

}
