import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactoService } from '../../Services/contacto.service';
import { Contacto } from '../../modelo/contacto.Interface';

@Component({
  selector: 'app-add',
  standalone: true,
   //dependencias para html reactive.... para el form
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export default class AddComponent implements OnInit{

  private router=inject(Router);
  private fb = inject(FormBuilder);
  private contactoService=inject(ContactoService);
  //dependencia para editar
  private route=inject(ActivatedRoute);

  form?: FormGroup; 
  contact?: Contacto;

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
    if(id){
      this.contactoService.getById(parseInt(id)).subscribe(contacto=>{
        this.contact=contacto;
        this.form = this.fb.group({
          //validators => valida que es requerido los campos y el email 
          nombre:[contacto.nombre,[Validators.required]],
          email:[contacto.email,[Validators.required, Validators.email]],
        });
      })
    }else{
      this.form= this.fb.group({
        nombre:['',[Validators.required]],
        email:['',[Validators.required, Validators.email]]
      });
    }

  }
  save(){
    //validacion para que nombre y email sean abligatorios
    if(this.form?.invalid){
      return ;
    }
    const contactoForm = this.form!.value;
    if(this.contact){
      this.contactoService.update(this.contact.id,contactoForm).subscribe(()=>{
        this.router.navigate(['/']);
      });
    }else{
      this.contactoService.create(contactoForm).subscribe(()=>{
        this.router.navigate(['/']);
      });
    }
  }
}
