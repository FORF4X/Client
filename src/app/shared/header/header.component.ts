import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth.service";
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../features/auth/login/login.component';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoginComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the authStatus$ observable
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  openLoginModal(event: Event): void {
    event.preventDefault();
    document.getElementById('loginModal')?.classList.add('is-active');
  }

  closeLoginModal(): void {
    document.getElementById('loginModal')?.classList.remove('is-active');
  }

  logout(): void {
    this.authService.logout();
  }
}
