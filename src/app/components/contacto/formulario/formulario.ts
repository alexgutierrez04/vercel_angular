import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    mensaje: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });

  enviado = false;

  get nombre() { return this.formularioContacto.get('nombre'); }
  get email() { return this.formularioContacto.get('email'); }
  get mensaje() { return this.formularioContacto.get('mensaje'); }

  onSubmit() {
    if (this.formularioContacto.valid) {
      this.enviado = true;
      this.formularioContacto.reset();
      setTimeout(() => this.enviado = false, 3000);
    } else {
      this.formularioContacto.markAllAsTouched();
    }
  }
}