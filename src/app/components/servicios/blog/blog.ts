import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostBlog } from './post-blog.model';

const STORAGE_KEY = 'blog-posts';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  titulo = '';
  descripcion = '';
  busqueda = signal('');

  /** Lista reactiva de publicaciones persistida en localStorage */
  posts = signal<PostBlog[]>(this.cargarPosts());

  postEditando: PostBlog | null = null;

  /** Posts filtrados por búsqueda y ordenados (destacados primero, luego por fecha) */
  postsVisibles = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    let lista = [...this.posts()];

    if (termino) {
      lista = lista.filter(
        (post) =>
          post.titulo.toLowerCase().includes(termino) ||
          post.descripcion.toLowerCase().includes(termino),
      );
    }

    return lista.sort((a, b) => {
      if (a.destacado !== b.destacado) {
        return a.destacado ? -1 : 1;
      }
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
  });

  contador = computed(
    () => `${this.postsVisibles().length} de ${this.posts().length} publicaciones`,
  );

  get tituloValido(): boolean {
    return this.titulo.trim().length >= 3;
  }

  get descripcionValida(): boolean {
    return this.descripcion.trim().length >= 10;
  }

  get formularioValido(): boolean {
    return this.tituloValido && this.descripcionValida;
  }

  agregarPost(): void {
    if (!this.formularioValido) {
      return;
    }

    const nuevoPost: PostBlog = {
      id: Date.now(),
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      fecha: new Date().toISOString(),
      destacado: false,
    };

    this.posts.update((lista) => [nuevoPost, ...lista]);
    this.persistirPosts();
    this.titulo = '';
    this.descripcion = '';
  }

  eliminarPost(id: number): void {
    this.posts.update((lista) => lista.filter((post) => post.id !== id));
    this.persistirPosts();
    if (this.postEditando?.id === id) {
      this.postEditando = null;
    }
  }

  editarPost(post: PostBlog): void {
    this.postEditando = { ...post };
  }

  guardarEdicion(): void {
    if (!this.postEditando) {
      return;
    }

    const titulo = this.postEditando.titulo.trim();
    const descripcion = this.postEditando.descripcion.trim();

    if (titulo.length < 3 || descripcion.length < 10) {
      return;
    }

    this.posts.update((lista) =>
      lista.map((post) =>
        post.id === this.postEditando!.id
          ? { ...this.postEditando!, titulo, descripcion }
          : post,
      ),
    );
    this.persistirPosts();
    this.postEditando = null;
  }

  cancelarEdicion(): void {
    this.postEditando = null;
  }

  toggleDestacado(id: number): void {
    this.posts.update((lista) =>
      lista.map((post) =>
        post.id === id ? { ...post, destacado: !post.destacado } : post,
      ),
    );
    this.persistirPosts();
  }

  actualizarBusqueda(valor: string): void {
    this.busqueda.set(valor);
  }

  private cargarPosts(): PostBlog[] {
    try {
      const datos = localStorage.getItem(STORAGE_KEY);
      if (!datos) {
        return [];
      }

      const lista = JSON.parse(datos) as PostBlog[];
      return Array.isArray(lista) ? lista : [];
    } catch {
      return [];
    }
  }

  private persistirPosts(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts()));
  }
}
