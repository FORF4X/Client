import { Component, Input } from '@angular/core';
import { Doctor } from '../../shared/models/doctor.model';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss'],
})
export class DoctorCardComponent {
  @Input() doctor!: Doctor;

}
