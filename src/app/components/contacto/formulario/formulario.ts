import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  /** Formulario reactivo de contacto con validaciones sincrónicas */
  formularioContacto = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    mensaje: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ],
    }),
  });

  enviado = false;

  get nombre() {
    return this.formularioContacto.get('nombre');
  }
  get email() {
    return this.formularioContacto.get('email');
  }
  get mensaje() {
    return this.formularioContacto.get('mensaje');
  }

  /** El botón enviar solo se activa si el formulario es válido */
  get formularioValido(): boolean {
    return this.formularioContacto.valid;
  }

  onSubmit(): void {
    if (this.formularioContacto.valid) {
      this.enviado = true;
      this.formularioContacto.reset();
      setTimeout(() => (this.enviado = false), 3000);
    } else {
      this.formularioContacto.markAllAsTouched();
    }
  }
}
