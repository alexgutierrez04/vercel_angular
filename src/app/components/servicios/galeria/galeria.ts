import { Component, computed, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenGaleria } from './imagen-galeria.model';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {
  /** Catálogo estático de imágenes de la galería */
  readonly imagenes: ImagenGaleria[] = [
    {
      id: 1,
      src: 'https://picsum.photos/id/10/800/500',
      miniatura: 'https://picsum.photos/id/10/150/100',
      alt: 'Naturaleza 1',
    },
    {
      id: 2,
      src: 'https://picsum.photos/id/20/800/500',
      miniatura: 'https://picsum.photos/id/20/150/100',
      alt: 'Naturaleza 2',
    },
    {
      id: 3,
      src: 'https://picsum.photos/id/30/800/500',
      miniatura: 'https://picsum.photos/id/30/150/100',
      alt: 'Naturaleza 3',
    },
    {
      id: 4,
      src: 'https://picsum.photos/id/50/800/500',
      miniatura: 'https://picsum.photos/id/50/150/100',
      alt: 'Naturaleza 4',
    },
  ];

  /** Índice de la imagen activa en la vista principal */
  indiceSeleccionado = signal(0);

  /** Imagen actual derivada del índice seleccionado */
  imagenSeleccionada = computed(() => this.imagenes[this.indiceSeleccionado()]);

  /** Contador visual, por ejemplo "2 de 4" */
  contador = computed(
    () => `${this.indiceSeleccionado() + 1} de ${this.imagenes.length}`,
  );

  seleccionarImagen(imagen: ImagenGaleria): void {
    const indice = this.imagenes.findIndex((item) => item.id === imagen.id);
    if (indice !== -1) {
      this.indiceSeleccionado.set(indice);
    }
  }

  esSeleccionada(imagen: ImagenGaleria): boolean {
    return imagen.id === this.imagenSeleccionada().id;
  }

  anterior(): void {
    const total = this.imagenes.length;
    this.indiceSeleccionado.update((indice) => (indice - 1 + total) % total);
  }

  siguiente(): void {
    const total = this.imagenes.length;
    this.indiceSeleccionado.update((indice) => (indice + 1) % total);
  }

  /** Navegación con flechas del teclado (← anterior, → siguiente) */
  @HostListener('document:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.anterior();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.siguiente();
    }
  }
}
