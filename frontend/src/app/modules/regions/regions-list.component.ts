import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../core/api/api.service';

@Component({
  selector: 'app-regions-list',
  standalone: true,
  imports: [MatCardModule, MatListModule, NgFor, AsyncPipe],
  template: `
    <mat-card>
      <mat-card-title>Régions</mat-card-title>
      <mat-card-content>
        <mat-list role="list" *ngIf="regions$ | async as regions">
          <mat-list-item role="listitem" *ngFor="let region of regions.data">
            <div matListItemTitle>{{ region.name }}</div>
            <div matListItemLine>Code: {{ region.code }} - Siège: {{ region.headquarters || 'N/A' }}</div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `
})
export class RegionsListComponent {
  readonly regions$ = this.api.getRegions();

  constructor(private readonly api: ApiService) {}
}
