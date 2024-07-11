import { Component, inject, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';
import { Usuario } from '../../modelo/usuario.Interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './list.component.html'
})
export default class ListComponent implements OnInit{
  private usuarioService=inject(UsuarioService);
  
  usuarios:Usuario[]=[];
 
  ngOnInit(): void {
    this.readAllUsuario();
  }
  //listar usuarios
  readAllUsuario(){
    this.usuarioService.ListarUsuario().subscribe(usuarios=>{
      this.usuarios=usuarios;
    });
  }
  //eliminar Usuario
  deleteUsuario(usuario:Usuario){
    this.usuarioService.DeleteUsuario(usuario.id).subscribe(()=>{//elimina usuario
      this.readAllUsuario();//lista usuario
    });
  }
}
