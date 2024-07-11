import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';
import { Usuario } from '../../modelo/usuario.Interface';

@Component({
  selector: 'app-add',
  standalone: true,
  //dependencias para html reactive.... para el form
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './add.component.html'
})
export default class AddComponent implements OnInit{
  private router=inject(Router);
  private fb=inject(FormBuilder);
  private usuarioService=inject(UsuarioService);
  //dependencia para editar
  private route=inject(ActivatedRoute);

  form?:FormGroup;
  usuario?:Usuario;

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.usuarioService.ListarUsuarioId(parseInt(id)).subscribe(usuario=>{
        this.usuario=usuario;
        this.form=this.fb.group({
          nombre:[usuario.nombre, [Validators.required]],
          email:[usuario.email, [Validators.required,Validators.email]],
          pws:[usuario.pws,[Validators.required]],
          telefono:[usuario.telefono,[Validators.required]],
        });
      });
    }else{
      this.form=this.fb.group({
        nombre:['', [Validators.required]],
        email:['', [Validators.required,Validators.email]],
        pws:['',[Validators.required]],
        telefono:['',[Validators.required]]
      });
    }
  }
  save(){
    //validacion para que nombre y email sean abligatorios
    if(this.form?.invalid){
      return ;
    }
    const formUsuario=this.form!.value;
    if(this.usuario){
      this.usuarioService.UpdateUsuario(this.usuario.id,formUsuario).subscribe(()=>{
        this.router.navigate(['/usuario']);
      });
    }else{
      this.usuarioService.SaveUsuario(formUsuario).subscribe(()=>{
        this.router.navigate(['/usuario']);
      });
    }
  }

}
