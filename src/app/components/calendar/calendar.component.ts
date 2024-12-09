import { Component, OnInit } from '@angular/core';
import {addDays, startOfWeek, endOfWeek, addMonths, getMonth, getYear} from 'date-fns';
import { DatePipe, CommonModule } from "@angular/common";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class WeekCalendarComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: Date = new Date();
  weekDays: { date: Date }[] = [];
  timeSlots: string[] = [];

  ngOnInit(): void {
    this.generateTimeSlots();
    this.loadCurrentWeek();
  }

  generateTimeSlots(): void {
    this.timeSlots = [];
    for (let i = 9; i <= 16; i++) {
      this.timeSlots.push(`${i}:00 - ${i + 1}:00`);
    }
  }

  loadCurrentWeek(): void {
    this.setWeekDays(this.currentDate);
    this.updateMonthBasedOnCurrentDate();
  }

  loadNextWeek(): void {
    this.currentDate = addDays(this.currentDate, 7);
    this.setWeekDays(this.currentDate);
    this.updateMonthBasedOnCurrentDate();
  }

  loadPreviousWeek(): void {
    this.currentDate = addDays(this.currentDate, -7);
    this.setWeekDays(this.currentDate);
    this.updateMonthBasedOnCurrentDate();
  }

  setWeekDays(date: Date): void {
    const start = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
    this.weekDays = Array.from({ length: 7 }).map((_, index) => ({
      date: addDays(start, index),
    }));
  }

  loadNextMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, 1);
    this.syncCurrentDateWithMonth();
  }

  loadPreviousMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, -1);
    this.syncCurrentDateWithMonth();
  }

  syncCurrentDateWithMonth(): void {
    const start = startOfWeek(this.currentMonth, { weekStartsOn: 0 });
    this.currentDate = start;
    this.setWeekDays(this.currentDate);
  }

  updateMonthBasedOnCurrentDate(): void {
    const month = getMonth(this.currentDate);
    const year = getYear(this.currentDate);
    this.currentMonth = new Date(year, month, 1);
  }
}
