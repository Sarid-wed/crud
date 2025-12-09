import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.base}/clientes`);
  }

  crearUsuario(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.base}/clientes`, cliente);
  }

  actualizarUsuario(id: string, cliente: Cliente): Observable<any> {
    // eliminar _id del body antes de enviar (requisito CRUDCRUD)
    const { _id, ...rest } = cliente as any;
    return this.http.put(`${this.base}/clientes/${id}`, rest);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.base}/clientes/${id}`);
  }
  
}
