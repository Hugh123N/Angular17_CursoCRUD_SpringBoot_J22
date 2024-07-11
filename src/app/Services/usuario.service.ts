import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario.Interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http=inject(HttpClient);

  constructor() { }

  ListarUsuario(){
    return this.http.get<Usuario[]>('http://localhost:8080/api/usuario');
  }
  ListarUsuarioId(id:number){
    return this.http.get<Usuario>(`http://localhost:8080/api/usuario/${id}`);
  }
  ValidarUsuario(nombre:string,email:string){
    return this.http.get<Usuario>(`http://localhost:8080/api/usuario/${nombre}&${email}`);
  }
  SaveUsuario(usuario:Usuario){
    return this.http.post<Usuario>('http://localhost:8080/api/usuario',usuario);
  }
  UpdateUsuario(id :number,usuario :Usuario){
    return this.http.put<Usuario>(`http://localhost:8080/api/usuario/${id}`,usuario);
  }
  DeleteUsuario(id:number){
    return this.http.delete<void>(`http://localhost:8080/api/usuario/${id}`);
  }


}
