import { Routes } from '@angular/router';

export const routes: Routes = [
    //aqui es donde se agrega los componenetes para que sean reconocidas
    {
    path:'',
    loadComponent:() => import('./Contacto/list/list.component')
    },
    {
        path:'new',
        loadComponent:() => import('./Contacto/add/add.component')
    },
    {
        path:'edit/:id',
        loadComponent:() => import('./Contacto/add/add.component')
    },
    //USUARIO
    {
        path:'usuario',
        loadComponent:() => import('./Usuario/list/list.component')
    },
    {
        path:'usuario/new',
        loadComponent:() => import('./Usuario/add/add.component')
    },
    {
        path:'usuario/edit/:id',
        loadComponent:() => import('./Usuario/add/add.component')
    }

    

];
