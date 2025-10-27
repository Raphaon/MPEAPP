import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly token = signal<string | null>(null);

  login(email: string, password: string) {
    return this.http
      .post<{ accessToken: string; user: any }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          this.token.set(response.accessToken);
          localStorage.setItem('brethren_token', response.accessToken);
        })
      );
  }

  loadToken() {
    this.token.set(localStorage.getItem('brethren_token'));
  }
}
