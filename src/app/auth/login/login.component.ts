import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: any): void {
    this.authService.login(form.value).subscribe({
      next: (response) => {
        const token = response.token;  // Assuming the token is in the response body
        console.log('Successfully logged in', token);  // Log token in the console
        this.router.navigate(['/doctors']);  // Navigate to doctors or other page
      },
      error: (err) => {
        console.error('Login failed', err);  // Log the error if login fails
      },
    });
  }
}
