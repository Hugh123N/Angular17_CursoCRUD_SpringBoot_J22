import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contacto } from '../modelo/contacto.Interface';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private http=inject(HttpClient);

  constructor() { }

  Listar(){
    return this.http.get<Contacto[]>('http://localhost:8080/api/contacto');
  }
  getById(id: number){
    return this.http.get<Contacto>(`http://localhost:8080/api/contacto/${id}`);
  }
  create(contacto: Contacto){//any es lo que sea
    return this.http.post<Contacto>('http://localhost:8080/api/contacto',contacto);
}
  update(id:number,contacto:Contacto){//any es lo que sea
    return this.http.put<Contacto>(`http://localhost:8080/api/contacto/${id}`,contacto);
  }
  delete(id:number){
    return this.http.delete<void>(`http://localhost:8080/api/contacto/${id}`);
  }
}
