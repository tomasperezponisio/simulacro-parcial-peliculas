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
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from '@angular/fire/storage'
import {iterator} from "rxjs/internal/symbol/iterator";

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
  nombreCompleto: string = '';
  actorSeleccionado!: Actor;
  tipoOpciones = ['terror', 'comedia', 'amor', 'otros'];

  constructor(
    private peliculasService: PeliculasService,
    private storage: Storage
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
        Validators.required
      ]),
      nombreCompleto: new FormControl("", [
        Validators.required
      ]),
    });

    //this.traerImagenes();
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
    this.nombreCompleto = nombreCompleto;
    this.form.patchValue({nombreCompleto: nombreCompleto});
    this.actorSeleccionado = actor;
  }

  altaPelicula(): void {
     if (this.form.invalid) {
       console.log('Form is invalid.');
       Object.keys(this.form.controls).forEach(key => {
         const controlErrors = this.form.get(key)?.errors;
         if (controlErrors != null) {
           console.log(`Key: ${key}, Errors: `, controlErrors);
         }
       });
       return;
     }

    console.log('Alta pelicula');

    const fileInput: HTMLInputElement | null = document.getElementById('imagen') as HTMLInputElement;
    if (fileInput?.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const imgRef = ref(this.storage, `images/${file.name}`);

      // subo la imagen y me traigo la url
      uploadBytes(imgRef, file)
        .then(async response => {
          console.log('Image uploaded successfully:', response);
          const downloadURL = await getDownloadURL(response.ref);
          console.log('Image URL:', downloadURL);

          const pelicula = new Pelicula(
            this.form.value.nombre,
            this.form.value.tipo,
            this.form.value.fechaEstreno,
            this.form.value.cantidadPublico,
            downloadURL,
            this.actorSeleccionado
          );

          // Guardo la pelicula en Firestore
          this.peliculasService.altaPelicula(pelicula)
            .then((): void => {
              this.showSuccessAlert('Película dada de alta exitosamente.').then(() => {
                this.form.reset();
                this.nombreCompleto = "";
              });
            })
            .catch(error => {
              this.showErrorAlert('Error al dar de alta la película: ' + error).then(() => {
                this.form.reset();
                this.nombreCompleto = "";
              });
            });
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          this.showErrorAlert('Error al subir la imagen. Intenta de nuevo.');
        });
    }

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

/*  subirImagen($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }*/

/*  traerImagenes() {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async response => {
        //console.log(response);
        for (const item of response.items) {
          const url = await getDownloadURL(item);
          //console.log(url);

        }
      })
      .catch(error => console.log(error));
  }*/

}
