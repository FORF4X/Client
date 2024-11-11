import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  isDoctor: boolean = false;

  onRegister(form: any): void {
    if (this.isDoctor) {
      this.authService.registerDoctor(form.value).subscribe({
        next: () => console.log('Doctor registered successfully'),
        error: (err) => console.error('Doctor registration failed', err),
      });
    } else {
      this.authService.registerUser(form.value).subscribe({
        next: () => console.log('User registered successfully'),
        error: (err) => console.error('User registration failed', err),
      });
    }
  }
}
