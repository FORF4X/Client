import { Routes } from '@angular/router';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";

export const routes: Routes = [
  { path: 'doctors', component: DoctorListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/doctors', pathMatch: 'full' },
];
