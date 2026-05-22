import { Component } from '@angular/core';
import { Galeria } from './galeria/galeria';
import { Blog } from './blog/blog';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [Galeria, Blog],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios {}