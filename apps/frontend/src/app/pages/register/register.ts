import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  message = '';
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  register(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.auth.register(
      this.name,
      this.email,
      this.password
    ).subscribe({
      next: () => {
        this.message = 'Cuenta creada correctamente. Redirigiendo al login...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'No se pudo crear la cuenta';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}