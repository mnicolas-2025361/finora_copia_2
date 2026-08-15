import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        this.router.navigate(['/home']);
      },

      error: (error) => {
        console.error('Error de login:', error);

        this.errorMessage =
          error.error?.message ||
          'Correo o contraseña incorrectos';
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}