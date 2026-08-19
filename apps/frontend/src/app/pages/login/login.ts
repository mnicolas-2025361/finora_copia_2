import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  email = '';
  password = '';

  errorMessage = '';
  sessionExpired = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const expired =
      localStorage.getItem('sessionExpired');

    if (expired === 'true') {

      this.sessionExpired = true;

      localStorage.removeItem(
        'sessionExpired'
      );
    }
  }

  login(): void {

    this.errorMessage = '';
    this.sessionExpired = false;

    this.auth.login(
      this.email,
      this.password
    ).subscribe({

      next: () => {

        this.router.navigate(['/home']);

      },

      error: (error) => {

        console.error(
          'Error de login:',
          error
        );

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