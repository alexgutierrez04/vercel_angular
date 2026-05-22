import { Component } from '@angular/core';
import { Formulario } from './formulario/formulario';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [Formulario],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {}