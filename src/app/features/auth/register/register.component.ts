import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isDoctor: boolean = false;
  photo: File | null = null;
  cv: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onFileChange(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (fileType === 'photo') {
      this.photo = file;
    } else if (fileType === 'cv') {
      this.cv = file;
    }

    // Optional: Provide feedback if files exceed a certain size limit
    const maxSize = 10 * 1024 * 1024;
    if (file && file.size > maxSize) {
      alert('File is too large. Max size is 10MB');
    }
  }

  onRegister(form: any): void {
    const formData = new FormData();
    formData.append('email', form.value.email);
    formData.append('password', form.value.password);
    formData.append('firstName', form.value.firstName);
    formData.append('lastName', form.value.lastName);
    formData.append('category', form.value.category);
    formData.append('activationCode', form.value.activationCode);
    formData.append('privateNumber', form.value.privateNumber);

    if (this.photo) {
      formData.append('photo', this.photo, this.photo.name);
    } else if (this.isDoctor) {
      alert('Please upload a photo.');
      return;  // Prevent form submission if photo is missing
    }

    if (this.cv) {
      formData.append('cv', this.cv, this.cv.name);
    } else if (this.isDoctor) {
      alert('Please upload a CV.');
      return;  // Prevent form submission if CV is missing
    }

    if (this.isDoctor) {
      this.authService.registerDoctor(formData).subscribe({
        next: () => this.router.navigate(['/profiles/doctor']),
        error: (err) => console.error('Doctor registration failed', err.error.errors),
      });
    } else {
      this.authService.registerUser(formData).subscribe({
        next: () => this.router.navigate(['/profiles/user']),
        error: (err) => console.error('User registration failed', err.error.errors),
      });
    }
  }

}
