import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  clientes: Cliente[] = [];

  // Modelo correcto
  cliente: Cliente = { nombre: '', artista: '', genero: '' };

  editMode = false;
  editId: string | null = null;
  cargando = false;
  errorMessage = '';

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista() {
    this.cargando = true;

    this.usuariosService.getUsuarios().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Error al cargar la lista';
        this.cargando = false;
      }
    });
  }

  guardar() {
    if (!this.cliente.nombre || !this.cliente.artista) {
      alert('Nombre y correo son obligatorios');
      return;
    }

    if (this.editMode && this.editId) {
      const payload: Cliente = { ...this.cliente };

      this.usuariosService.actualizarUsuario(this.editId, payload).subscribe({
        next: () => {
          this.resetForm();
          this.cargarLista();
          this.editMode = false;
          this.editId = null;
        },
        error: (err: any) => {
          console.error(err);
          alert('Error al actualizar');
        }
      });

    } else {
      const payload: Cliente = { ...this.cliente };

      this.usuariosService.crearUsuario(payload).subscribe({
        next: () => {
          this.resetForm();
          this.cargarLista();
        },
        error: (err: any) => {
          console.error(err);
          alert('Error al crear');
        }
      });
    }
  }

  editar(c: Cliente) {
    this.editMode = true;
    this.editId = c._id || null;

    this.cliente = {
      nombre: c.nombre,
      artista: c.artista,
      genero: c.genero
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(c: Cliente) {
    if (!c._id) {
      alert('No se puede eliminar: id no encontrado');
      return;
    }

    if (!confirm(`¿Eliminar a ${c.nombre}?`)) return;

    this.usuariosService.eliminarUsuario(c._id).subscribe({
      next: () => {
        this.cargarLista();
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al eliminar');
      }
    });
  }

  cancelarEdicion() {
    this.resetForm();
    this.editMode = false;
    this.editId = null;
  }

  private resetForm() {
    this.cliente = { nombre: '', artista: '', genero: '' };
  }

}
