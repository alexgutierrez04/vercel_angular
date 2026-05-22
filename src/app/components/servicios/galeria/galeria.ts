import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css'
})
export class Galeria {

  imagenes = [
    {
      id: 1,
      src: 'https://picsum.photos/id/10/800/500',
      miniatura: 'https://picsum.photos/id/10/150/100',
      alt: 'Naturaleza 1'
    },
    {
      id: 2,
      src: 'https://picsum.photos/id/20/800/500',
      miniatura: 'https://picsum.photos/id/20/150/100',
      alt: 'Naturaleza 2'
    },
    {
      id: 3,
      src: 'https://picsum.photos/id/30/800/500',
      miniatura: 'https://picsum.photos/id/30/150/100',
      alt: 'Naturaleza 3'
    },
    
    {
      id: 4,
      src: 'https://picsum.photos/id/50/800/500',
      miniatura: 'https://picsum.photos/id/50/150/100',
      alt: 'Naturaleza 5'
    }
  ];

  imagenSeleccionada = this.imagenes[0];

  seleccionarImagen(imagen: any) {
    this.imagenSeleccionada = imagen;
  }
}