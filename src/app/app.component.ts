import { Component } from '@angular/core';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [DoctorListComponent, RouterModule],
})
export class AppComponent {}
