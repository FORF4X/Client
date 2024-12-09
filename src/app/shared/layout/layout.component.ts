import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "../header/header.component";
import {SideMenuComponent} from "../../components/side-menu/side-menu.component";
import {FooterComponent} from "../footer/footer.component";
import {NgIf} from "@angular/common";
import {WeekCalendarComponent} from "../../components/calendar/calendar.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    SideMenuComponent,
    RouterOutlet,
    FooterComponent,
    NgIf,
    WeekCalendarComponent,
  ],
})
export class LayoutComponent implements OnInit {
  showSideMenu: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const cleanUrl = event.urlAfterRedirects.split('?')[0].replace(/^\/+/, '');
        console.log('Clean URL:', cleanUrl);
        this.showSideMenu = cleanUrl !== 'register';
        console.log('Show Side Menu (final):', this.showSideMenu);
      }
    });
  }
}
