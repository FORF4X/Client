import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss'
})
export class DoctorProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';

  ngOnInit(): void {
    const profile = localStorage.getItem('profile');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      this.firstName = parsedProfile.firstName;
      this.lastName = parsedProfile.lastName;
    }
  }
}
