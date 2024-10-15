import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Pelicula} from "../../../../models/pelicula";
import {CommonModule, DatePipe, NgIf} from "@angular/common";
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-peliculas',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    CommonModule
  ],
  templateUrl: './detalle-peliculas.component.html',
  styleUrl: './detalle-peliculas.component.css'
})

export class DetallePeliculasComponent implements OnChanges {
  @Input() pelicula?: Pelicula;

  formattedDate: Date | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pelicula'] && this.pelicula) {
      if (this.isTimestamp(this.pelicula.fechaEstreno)) {
        this.formattedDate = this.pelicula.fechaEstreno.toDate();
      }
    }
  }

  isTimestamp(obj: any): obj is Timestamp {
    return obj && obj instanceof Timestamp;
  }


}
