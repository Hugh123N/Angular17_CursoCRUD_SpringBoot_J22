import { Component, inject, OnInit } from '@angular/core';
import { ContactoService } from '../../Services/contacto.service';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Contacto } from '../../modelo/contacto.Interface';

@Component({
  selector: 'app-list',
  standalone: true,
  //importas todo lo que utilizas en html
  imports: [DatePipe,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent implements OnInit{
  private contactoService = inject(ContactoService);

  contactos:Contacto[]=[];

  ngOnInit(): void {
    this.loadAll();
  }
  //listaContactos
  loadAll(){
    this.contactoService.Listar().subscribe(contactos=>{
      this.contactos=contactos;
    });
  }
  //eliminarContacto
  deleteContacto(contacto:Contacto){
    this.contactoService.delete(contacto.id).subscribe(()=>{
      console.log('registro eliminado');
      this.loadAll();
    });
  }
}
