import {Injectable} from '@angular/core';
import {Firestore, collection, addDoc} from "@angular/fire/firestore";
import {Actor} from "../models/actor";

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor(
    private firestore: Firestore
  ) {
  }

  async altaActor(actor: Actor): Promise<void> {
    try {
      const actoresCollection = collection(this.firestore, 'actores');

      await addDoc(actoresCollection, {
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

}
