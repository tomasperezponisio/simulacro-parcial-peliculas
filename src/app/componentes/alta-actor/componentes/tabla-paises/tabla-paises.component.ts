import {Component, EventEmitter, Output} from '@angular/core';
import {PaisesService} from "../../../../services/paises.service";
import {NgForOf} from "@angular/common";

interface Pais {
  id: string;
  nombre: string;
  bandera: string;
}

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css'
})
export class TablaPaisesComponent {
  paises: Pais[] = [];

  @Output() paisSeleccionado = new EventEmitter<string>();

  constructor(
    private countryService: PaisesService
  ) { }

  ngOnInit(): void {
    this.countryService.traerPaises().subscribe((data) => {
      this.paises = data.map((country) => ({
        id: country.cca3,
        nombre: country.name.common,
        bandera: country.flags.svg,
      }));
    });
  }

  elegirPais(name: string): void {
    this.paisSeleccionado.emit(name);
  }

}
