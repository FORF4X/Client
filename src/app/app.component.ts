import { Component } from '@angular/core';
import { DoctorListComponent } from './features/doctor/doctor-list/doctor-list.component';
import { RouterModule } from '@angular/router';
import {AuthService} from "./core/auth.service";
import {LayoutComponent} from "./shared/layout/layout.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [DoctorListComponent, RouterModule, LayoutComponent],
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
