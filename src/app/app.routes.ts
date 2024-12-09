import { Routes } from '@angular/router';
import { DoctorListComponent } from './features/doctor/doctor-list/doctor-list.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { UserProfileComponent } from './features/profiles/user-profile/user-profile.component';
import { DoctorProfileComponent } from './features/profiles/doctor-profile/doctor-profile.component';
import { DoctorAuthGuard } from './core/guards/doctor-auth.guard';
import { UserAuthGuard } from './core/guards/user-auth.guard';
import { AuthGuard } from './core/guards/auth.guard'; // Import the AuthGuard

export const routes: Routes = [
  { path: 'doctors', component: DoctorListComponent }, // Accessible by everyone
  { path: 'register', component: RegisterComponent }, // Accessible by everyone
  { path: 'login', component: LoginComponent }, // Accessible by everyone
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard, UserAuthGuard]
  },
  {
    path: 'doctor-profile',
    component: DoctorProfileComponent,
    canActivate: [AuthGuard, DoctorAuthGuard] // Ensure the user is authenticated before accessing the profile
  },
  { path: '', redirectTo: '/doctors', pathMatch: 'full' }, // Redirect to doctors list
  { path: '**', redirectTo: '/doctors', pathMatch: 'full' }, // Wildcard redirect to doctors list
];
