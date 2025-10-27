import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/api/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="login-wrapper">
      <mat-card>
        <mat-card-title>Connexion</mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Mot de passe</mat-label>
              <input matInput formControlName="password" type="password" />
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
              Se connecter
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 64px);
      }
      mat-card {
        width: min(360px, 90%);
      }
    `
  ]
})
export class LoginComponent {
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router) {}

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe(() => this.router.navigate(['/dashboard']));
  }
}
