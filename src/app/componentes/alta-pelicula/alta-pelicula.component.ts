import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TablaPaisesComponent} from "../alta-actor/componentes/tabla-paises/tabla-paises.component";
import {ActoresComponent} from "../actores/actores.component";
import {MatFormField, MatHint, MatSuffix} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatDatepickerModule} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {provideNativeDateAdapter} from "@angular/material/core";
import {TablaActoresComponent} from "./componentes/tabla-actores/tabla-actores.component";
import {Actor} from "../../models/actor";
import {PeliculasService} from "../../services/peliculas.service";
import {Pelicula} from "../../models/pelicula";
import Swal from "sweetalert2";


@Component({
  selector: 'app-alta-pelicula',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgIf,
    ReactiveFormsModule,
    TablaPaisesComponent,
    ActoresComponent,
    NgForOf,
    MatFormField,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatInput,
    MatHint,
    MatSuffix,
    MatInputModule,
    MatDatepickerModule,
    TablaActoresComponent
  ],
  templateUrl: './alta-pelicula.component.html',
  styleUrl: './alta-pelicula.component.css'
})
export class AltaPeliculaComponent implements OnInit {
  form!: FormGroup;
  protagonista: string = '';
  tipoOpciones = ['terror', 'comedia', 'amor', 'otros'];

  constructor(
    private peliculasService: PeliculasService

  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl("", [
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ ]+$'),
        Validators.required
      ]),
      tipo: new FormControl("", [
        Validators.required
      ]),
      fechaEstreno: new FormControl("", [
        Validators.required
      ]),
      cantidadPublico: new FormControl("", [
        Validators.min(0),
        Validators.required
      ]),
      imagen: new FormControl("", [
        Validators.pattern('^[0-9]{8}$'),
        Validators.required
      ]),
      protagonista: new FormControl("", [
        Validators.required
      ]),
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get tipo() {
    return this.form.get('tipo');
  }

  get fechaEstreno() {
    return this.form.get('fechaEstreno');
  }

  get cantidadPublico() {
    return this.form.get('cantidadPublico');
  }

  get imagen() {
    return this.form.get('imagen');
  }

  alSeleccionarUnActor(actor: Actor): void {
    let nombreCompleto = actor.nombre + ' ' + actor.apellido;
    this.protagonista = nombreCompleto;
    this.form.patchValue({protagonista: nombreCompleto});
  }

  altaPelicula(): void {
    // if (this.form.invalid) {
    //   return;
    // }

    console.log('Alta pelicula');


    const pelicula = new Pelicula(
      this.form.value.nombre,
      this.form.value.tipo,
      this.form.value.fechaEstreno,
      this.form.value.cantidadPublico,
      this.form.value.imagen,
      this.protagonista
    );

    this.peliculasService.altaPelicula(pelicula)
      .then((): void => {
        this.showSuccessAlert('Película dada de alta exitosamente.').then(() => {
          this.form.reset();
          this.protagonista = "";
        });
      })
      .catch(error => {
        this.showErrorAlert('Error al dar de alta la película: ' + error).then(() => {
          this.form.reset();
          this.protagonista = "";
        });
      });

  }

  /**
   * Muestra mensaje de exito
   * @param message
   * @private
   */
  private showSuccessAlert(message: string) {
    return Swal.fire({
      title: 'Nueva Película!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Muestra mensaje de error
   * @param message
   * @private
   */
  private showErrorAlert(message: string) {
    return Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

}
