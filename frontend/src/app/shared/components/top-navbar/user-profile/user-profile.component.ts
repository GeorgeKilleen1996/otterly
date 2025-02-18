import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserAvatarComponent } from '../../../../UI/components/user-avatar/user-avatar.component';
import { AuthService } from '../../../../main/auth/services/auth.service';
import { BaseAccount } from '../../../../main/auth/interfaces/auth';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, NgIcon],
  viewProviders: [provideIcons({ lucideChevronDown })],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  constructor(private authService: AuthService) {}

  activeUser: BaseAccount | null = this.authService.getAccount();
}
