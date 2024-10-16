import {Injectable} from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  CollectionReference,
} from '@angular/fire/firestore';
import {Actor} from "../models/actor";
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActoresService {
  private actoresCollection: CollectionReference;

  constructor(
    private firestore: Firestore
  ) {
    this.actoresCollection = collection(this.firestore, 'actores');
  }

  async altaActor(actor: Actor): Promise<void> {
    try {
      await addDoc(this.actoresCollection, {
        nombre: actor.nombre,
        apellido: actor.apellido,
        documento: actor.documento,
        edad: actor.edad,
        pais: actor.pais,
      });

    } catch (error) {
      throw error;
    }
  }

  getActores(): Observable<Actor[]> {
    return collectionData(this.actoresCollection, { idField: 'id' }) as Observable<Actor[]>;
  }

/*  getActores(): Observable<Actor[]> {

    return collectionData(this.actoresCollection, { idField: 'id' }).pipe(
      map(data =>
        data.map(item => ({
          nombre: item['nombre'],
          apellido: item['apellido'],
          documento: item['documento'],
          edad: item['edad'],
          pais: item['pais']
        }))
      )
    );
  }*/


}
