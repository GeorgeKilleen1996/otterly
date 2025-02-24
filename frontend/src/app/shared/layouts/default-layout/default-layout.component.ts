import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavbarComponent } from '../../components/top-navbar/top-navbar.component';
import { MainNavbarComponent } from '../../components/main-navbar/main-navbar.component';
import { ToastComponent } from '../../../UI/toast/toast.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopNavbarComponent, MainNavbarComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
  
}
