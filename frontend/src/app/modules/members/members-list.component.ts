import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { debounceTime } from 'rxjs';
import { ApiService, MemberFilter } from '../../core/api/api.service';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    AsyncPipe
  ],
  template: `
    <mat-card>
      <mat-card-title>Membres</mat-card-title>
      <mat-card-content>
        <form [formGroup]="filterForm" class="filters">
          <mat-form-field>
            <mat-label>Région</mat-label>
            <input matInput formControlName="regionId" placeholder="UUID région" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>District</mat-label>
            <input matInput formControlName="districtId" placeholder="UUID district" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Assemblée</mat-label>
            <input matInput formControlName="assemblyId" placeholder="UUID assemblée" />
          </mat-form-field>
        </form>

        <table mat-table [dataSource]="members()" class="mat-elevation-z2">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let member">{{ member.lastName }} {{ member.firstName }}</td>
          </ng-container>
          <ng-container matColumnDef="assembly">
            <th mat-header-cell *matHeaderCellDef>Assemblée</th>
            <td mat-cell *matCellDef="let member">{{ member.assembly?.name }}</td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Statut</th>
            <td mat-cell *matCellDef="let member">{{ member.status }}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .filters {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        margin-bottom: 1rem;
      }
      table {
        width: 100%;
      }
    `
  ]
})
export class MembersListComponent {
  displayedColumns = ['name', 'assembly', 'status'];
  members = signal<any[]>([]);

  readonly filterForm = this.fb.group({
    regionId: [''],
    districtId: [''],
    assemblyId: ['']
  });

  constructor(private readonly api: ApiService, private readonly fb: FormBuilder) {
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe((filters) => {
      this.load(filters as MemberFilter);
    });
    this.load({});
  }

  private load(filters: MemberFilter) {
    this.api.getMembers(filters).subscribe((response) => this.members.set(response.data));
  }
}
