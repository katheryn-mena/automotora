import { Component, OnInit } from '@angular/core';
import { Automovil } from '../interfaces/automovil';
import { DatabaseService } from '../services/database.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  auto: Automovil;
  id: string;
  patente: string;
  numero_motor: number;
  marca: string;
  modelo: string;
  puertas: number;

  lista_automoviles: Automovil[];

  constructor(private database: DatabaseService, private apiService: ApiService) {}

  ngOnInit(){
    this.database.listarTodo('automoviles').then(respuesta=>{
      respuesta.subscribe(listaReferencia=>{
        this.lista_automoviles = [];
        listaReferencia.forEach(autoRef=>{
          let a = autoRef.payload.doc.data() as Automovil;
          a.id = autoRef.payload.doc.id;
          this.lista_automoviles.push(a);
        });
      });
    });
  }

  agregarAuto(){
    this.auto ={
      id: "",
      patente: this.patente,
      numero_motor: this.numero_motor,
      marca: this.marca,
      modelo: this.modelo,
      puertas: this.puertas
    };
    this.database.agregar('automoviles', this.auto).then(resp=>{
      alert('Auto agregado');
    }).catch(error=>{
      console.log("error: ",error);
    });
    this.patente = "";
    this.numero_motor = 0;
    this.marca = "";
    this.modelo = "";
    this.puertas = 0;
  }

  eliminarAuto(){
    if(this.id==""){
      alert("Campo vacío, no se puede eliminar")
    }else{
      this.database.eliminar('automoviles',this.id).then(resp=>{
        alert("Auto eliminado")
      }).catch(error=>{
        console.log("error: ",error);
      });
    }
    this.id = "";
    this.patente = "";
    this.numero_motor = 0;
    this.marca = "";
    this.modelo = "";
    this.puertas = 0;
  }

  cargarAuto(a: Automovil){
    this.id = a.id;
    this.patente = a.patente;
    this.numero_motor = a.numero_motor;
    this.marca = a.marca;
    this.modelo = a.modelo;
    this.puertas = a.puertas;
  }

  modificarAuto(){
    this.auto ={
      id: this.id,
      patente: this.patente,
      numero_motor: this.numero_motor,
      marca: this.marca,
      modelo: this.modelo,
      puertas: this.puertas
    };
    this.database.actualizar('automoviles', this.id, this.auto).then(resp=>{
      alert('Auto modificado');
    }).catch(error=>{
      console.log("error: ", error);
    });
  }

  obtenerPosts(){
    this.apiService.getPosts().subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }

  obtenerPost(){
    this.apiService.getPost(20).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }

  agregarPost(){
    var post={
      userId: 1,
      id: 101,
      title: 'hola mundo',
      body: 'hola lindo mundo de la programación'
    };
    this.apiService.crearPost(post).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }

  eliminarPost(){
    this.apiService.deletePost(20).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }

  modificarPost(){
    var post={
      userId: 1,
      id: 101,
      title: 'hola mundito',
      body: ''
    };
    this.apiService.modificarPost(20, post).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log("error: ",error);
      }
    );
  }
}
