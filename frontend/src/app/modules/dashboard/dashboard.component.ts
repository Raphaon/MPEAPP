import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { combineLatest, map, shareReplay } from 'rxjs';
import { ApiService } from '../../core/api/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, NgFor, NgIf, AsyncPipe],
  template: `
    <div class="dashboard-grid">
      <mat-grid-list cols="3" rowHeight="150px" gutterSize="16" *ngIf="summary$ | async as summary">
        <mat-grid-tile *ngFor="let item of summary">
          <mat-card>
            <mat-card-title>{{ item.title }}</mat-card-title>
            <mat-card-content>
              <div class="stat-value">{{ item.value }}</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <mat-card>
        <mat-card-title>Statistiques membres</mat-card-title>
        <mat-card-content *ngIf="membership$ | async as membership">
          <div class="chart-placeholder">
            <p>Femmes: {{ membership.byGender['F'] ?? 0 }}</p>
            <p>Hommes: {{ membership.byGender['M'] ?? 0 }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .stat-value {
        font-size: 2rem;
        font-weight: bold;
      }
      .chart-placeholder {
        display: grid;
        gap: 8px;
      }
      @media (max-width: 800px) {
        mat-grid-list {
          grid-auto-flow: row;
        }
      }
    `
  ]
})
export class DashboardComponent {
  readonly membership$ = this.api.getMembershipStats().pipe(
    shareReplay(1),
    map((stats) => ({
      byGender: stats.byGender.reduce(
        (acc: Record<string, number>, item: any) => ({
          ...acc,
          [item.gender ?? 'Inconnu']: Number(item.count)
        }),
        {}
      )
    }))
  );

  readonly summary$ = combineLatest([
    this.membership$,
    this.api.getRegionalStats()
  ]).pipe(
    map(([membership, regions]) => [
      { title: 'Régions', value: regions.length },
      { title: 'Total membres', value: Object.values(membership.byGender).reduce((a, b) => a + b, 0) },
      { title: 'Assemblées recensées', value: regions.reduce((acc, region) => acc + Number(region.assemblies ?? 0), 0) }
    ])
  );

  constructor(private readonly api: ApiService) {}
}
