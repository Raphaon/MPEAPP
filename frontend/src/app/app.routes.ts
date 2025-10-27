import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MembersListComponent } from './modules/members/members-list.component';
import { RegionsListComponent } from './modules/regions/regions-list.component';
import { LoginComponent } from './modules/auth/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'members', component: MembersListComponent },
  { path: 'regions', component: RegionsListComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
