import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../shared/services/doctor.service';
import { Doctor } from '../../../shared/models/doctor.model';
import { CommonModule } from '@angular/common';
import { DoctorCardComponent } from '../../../components/doctor-card/doctor-card.component'

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  imports: [CommonModule, DoctorCardComponent],
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }
}
