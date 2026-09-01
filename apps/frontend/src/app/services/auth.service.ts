import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  private expirationTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkStoredToken();
  }

  login(
    email: string,
    password: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    ).pipe(

      tap((response) => {

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        this.startExpirationTimer(response.token);
      })

    );
  }

  private startExpirationTimer(token: string): void {

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }

    const payload = this.decodeToken(token);

    if (!payload || !payload.exp) {
      return;
    }

    const expirationTime = payload.exp * 1000;

    const timeUntilExpiration =
      expirationTime - Date.now();

    if (timeUntilExpiration <= 0) {
      this.logout(true);
      return;
    }

    this.expirationTimer = setTimeout(() => {
      this.logout(true);
    }, timeUntilExpiration);
  }

  private checkStoredToken(): void {

    const token = localStorage.getItem('token');

    if (token) {
      this.startExpirationTimer(token);
    }
  }

  private decodeToken(token: string): any {

    try {

      const payload = token.split('.')[1];

      return JSON.parse(
        atob(
          payload
            .replace(/-/g, '+')
            .replace(/_/g, '/')
        )
      );

    } catch {
      return null;
    }
  }

  logout(expired: boolean = false): void {

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    if (expired) {
      localStorage.setItem(
        'sessionExpired',
        'true'
      );
    }

    this.router.navigate(['/login']);
  }
}