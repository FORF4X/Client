import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isDoctor()) {
      return true;
    }
    // Redirect to user profile if not a doctor
    this.router.navigate(['user-profile']);
    return false;
  }
}
