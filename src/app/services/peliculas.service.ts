import { Injectable } from '@angular/core';
import {Actor} from "../models/actor";
import {addDoc, collection, collectionData, CollectionReference, Firestore, query, where} from "@angular/fire/firestore";
import {Pelicula} from "../models/pelicula";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private readonly peliculasCollection: CollectionReference;

  constructor(
    private firestore: Firestore
  ) {
    this.peliculasCollection = collection(this.firestore, 'peliculas');
  }

  async altaPelicula(pelicula: Pelicula): Promise<void> {
    try {
      await addDoc(this.peliculasCollection, {
        nombre: pelicula.nombre,
        tipo: pelicula.tipo,
        fechaEstreno: pelicula.fechaEstreno,
        cantidadPublico: pelicula.cantidadPublico,
        imagen: pelicula.imagen,
        protagonista: pelicula.protagonista,
      });

    } catch (error) {
      throw error;
    }
  }

  getPeliculas(): Observable<Pelicula[]> {
    return collectionData(this.peliculasCollection, { idField: 'id' }) as Observable<Pelicula[]>;
  }

  // Get movies where the actor is the protagonist
  getPeliculasPorActor(actor: Actor): Observable<Pelicula[]> {
    // Create a Firestore query where 'protagonista' matches the actor's name and surname
    const peliculasQuery = query(
      this.peliculasCollection,
      where('protagonista.nombre', '==', actor.nombre),
      where('protagonista.apellido', '==', actor.apellido)
    );

    return collectionData(peliculasQuery, { idField: 'id' }) as Observable<Pelicula[]>;
  }

}
