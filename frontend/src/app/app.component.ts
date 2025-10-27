import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <mat-toolbar color="primary" class="app-toolbar">
      <span>Brethren</span>
    </mat-toolbar>
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app-toolbar {
        position: sticky;
        top: 0;
        z-index: 10;
      }
      .app-container {
        padding: 1rem;
      }
    `
  ],
  imports: [MatToolbarModule, RouterOutlet]
})
export class AppComponent {}
