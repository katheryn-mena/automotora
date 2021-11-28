import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ruta: string = 'https://jsonplaceholder.typicode.com/posts';
  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-origin': '**'
    })
  }

  getPosts(): Observable<any>{
    return this.http.get(this.ruta).pipe(retry(3));
  }

  getPost(id): Observable<any>{
    return this.http.get(this.ruta + '/' + id).pipe(retry(3));
  }

  crearPost(postAgregar): Observable<any>{
    return this.http.post(this.ruta, postAgregar, this.httpOptions).pipe(retry(3));
  }

  deletePost(id): Observable<any>{
    return this.http.delete(this.ruta + '/' + id, this.httpOptions).pipe(retry(2));
  }

  modificarPost(id, nuevoPost): Observable<any>{
    return this.http.put(this.ruta + '/' + id, nuevoPost, this.httpOptions).pipe(retry(3));
  }
}
