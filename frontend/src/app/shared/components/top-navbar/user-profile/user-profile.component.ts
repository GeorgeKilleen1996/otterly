import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { UserAvatarComponent } from '../../../../UI/components/user-avatar/user-avatar.component';
import { AuthService } from '../../../../main/auth/services/auth.service';
import { BaseAccount } from '../../../../main/auth/interfaces/auth';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProfileDropdownComponent } from "../profile-dropdown/profile-dropdown.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, OverlayModule, ProfileDropdownComponent],
  viewProviders: [provideIcons({ lucideChevronDown })],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  constructor(private authService: AuthService) {}

  profileMenuOpen:boolean = false;

  activeUser: BaseAccount | null = this.authService.getAccount();
}
