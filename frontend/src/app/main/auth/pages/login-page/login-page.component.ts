import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn } from '@ng-icons/lucide';
import { LoadingSpinnerComponent } from '../../../../UI/components/loading-spinner/loading-spinner.component';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, RouterLink, NgIcon, CommonModule],
  viewProviders: [provideIcons({ lucideLogIn })],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(protected navigationService: NavigationService) { }
}
