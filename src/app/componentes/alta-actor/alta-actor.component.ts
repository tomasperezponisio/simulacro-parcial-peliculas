import {Component, OnInit} from '@angular/core';
import {TablaPaisesComponent} from "./componentes/tabla-paises/tabla-paises.component";
import {Actor} from "../../models/actor";
import {ActoresService} from "../../services/actores.service";
import Swal from "sweetalert2";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-alta-actor',
  standalone: true,
  imports: [
    TablaPaisesComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './alta-actor.component.html',
  styleUrl: './alta-actor.component.css'
})
export class AltaActorComponent implements OnInit {
  form!: FormGroup;
  nacionalidad: string = '';

  constructor(
    private actorService: ActoresService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl("", [
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ]+$'),
        Validators.required
      ]),
      apellido: new FormControl("", [
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ]+$'),
        Validators.required
      ]),
      edad: new FormControl("", [
        Validators.min(18),
        Validators.max(99),
        Validators.required
      ]),
      documento: new FormControl("", [
        Validators.pattern('^[0-9]{8}$'),
        Validators.required
      ]),
      nacionalidad: new FormControl("", [
        Validators.required
      ]),
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }

  get edad() {
    return this.form.get('edad');
  }

  get documento() {
    return this.form.get('documento');
  }

  alSeleccionarUnPais(nombrePais: string): void {
    this.nacionalidad = nombrePais;
    this.form.patchValue({nacionalidad: nombrePais});
  }

  altaActor(): void {
    if (this.form.invalid) {
      return;
    }

    const actor = new Actor(
      this.form.value.nombre,
      this.form.value.apellido,
      this.form.value.edad,
      this.form.value.documento,
      this.nacionalidad
    );

    this.actorService.altaActor(actor)
      .then((): void => {
        this.showSuccessAlert('Actor dado de alta exitosamente.').then(() => {
          this.form.reset();
          this.nacionalidad = "";
        });
      })
      .catch(error => {
        this.showErrorAlert('Error al dar de alta al actor: ' + error).then(() => {
          this.form.reset();
          this.nacionalidad = "";
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
      title: 'Nuevo Actor!',
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
