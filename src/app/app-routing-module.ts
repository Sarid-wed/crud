import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Usuarios } from './usuarios/usuarios';
import { Cliente } from './models/cliente.model';


const routes: Routes = [
   { path: 'usuarios', component: Usuarios },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },

   { path: 'clientes', component: Usuarios },  
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
