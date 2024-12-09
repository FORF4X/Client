import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  privateNumber: string = '';
  email: string = '';
  profilePicture: string = '';

  ngOnInit(): void {
    const profile = localStorage.getItem('profile');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      this.firstName = parsedProfile.firstName || '';
      this.lastName = parsedProfile.lastName || '';
      this.privateNumber = parsedProfile.privateNumber || '';
      this.email = parsedProfile.email || '';
      this.profilePicture = parsedProfile.profilePicture || 'assets/default-profile.png';
    }
  }
}
