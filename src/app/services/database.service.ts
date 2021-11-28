import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  async agregar(llave, dato){
    try{
      return await this.firestore.collection(llave).add(dato);
    } catch (error) {
      console.log("error: ",error);
    }
  }

  async eliminar(llave, id){
    try{
      return await this.firestore.collection(llave).doc(id).delete();
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async listarTodo(llave){
    try{
      return await this.firestore.collection(llave).snapshotChanges();
    } catch (error) {
      console.log("error: ", error);
    }  
  }

  async listarId(llave, id){
    try{
      return await this.firestore.collection(llave).doc(id).get();
    } catch (error) {
      console.log("error: ", error);
    }
  }  

  async actualizar(llave, id, dato){
    try{
      return await this.firestore.collection(llave).doc(id).set(dato);
    } catch (error) {
      console.log("error: ", error);
    }  
  }

}
