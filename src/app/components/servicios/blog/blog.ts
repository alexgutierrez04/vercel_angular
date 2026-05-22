import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {

  titulo = '';
  descripcion = '';
  posts: any[] = [];
  postEditando: any = null;
  destacados: Set<number> = new Set();

  agregarPost() {
    if (this.titulo.trim() && this.descripcion.trim()) {
      this.posts.push({
        id: Date.now(),
        titulo: this.titulo,
        descripcion: this.descripcion
      });
      this.titulo = '';
      this.descripcion = '';
    }
  }

  eliminarPost(id: number) {
    this.posts = this.posts.filter(p => p.id !== id);
    this.destacados.delete(id);
  }

  editarPost(post: any) {
    this.postEditando = { ...post };
  }

  guardarEdicion() {
    const index = this.posts.findIndex(p => p.id === this.postEditando.id);
    if (index !== -1) {
      this.posts[index] = { ...this.postEditando };
    }
    this.postEditando = null;
  }

  cancelarEdicion() {
    this.postEditando = null;
  }

  toggleDestacado(id: number) {
    if (this.destacados.has(id)) {
      this.destacados.delete(id);
    } else {
      this.destacados.add(id);
    }
  }

  esDestacado(id: number): boolean {
    return this.destacados.has(id);
  }
}