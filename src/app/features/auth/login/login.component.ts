import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Note: Corrected property name to `styleUrls`
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: any): void {
    this.authService.login(form.value).subscribe({
      next: () => {
        console.log('Successfully logged in');

        // Fetch the saved profile
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');

        // Redirect based on the role
        if (profile.role === 'User') {
          this.router.navigate(['/user-profile']);
        } else if (profile.role === 'Doctor') {
          this.router.navigate(['/doctor-profile']);
        }

        this.closeModal();
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }


  closeModal(): void {
    document.getElementById('loginModal')?.classList.remove('is-active');
  }
}
