import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCalendar, lucideCommand, lucideMoon, lucideSearch, lucideSun } from '@ng-icons/lucide';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, NgIcon, UserProfileComponent],
  viewProviders: [provideIcons({ lucideBell, lucideMoon, lucideSun, lucideCalendar, lucideSearch, lucideCommand })],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {

}
