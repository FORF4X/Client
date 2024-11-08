import { Routes } from '@angular/router';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';

export const routes: Routes = [
  { path: 'doctors', component: DoctorListComponent },
  { path: '', redirectTo: '/doctors', pathMatch: 'full' },
];
