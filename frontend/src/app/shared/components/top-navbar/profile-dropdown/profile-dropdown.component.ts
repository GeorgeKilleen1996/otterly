import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAccount } from '../../../../main/auth/interfaces/auth';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../UI/components/card/card.component';
import { UserAvatarComponent } from '../../../../UI/components/user-avatar/user-avatar.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCog, lucideCreditCard, lucideLayoutList, lucideLogOut, lucideUserRound, lucideUserRoundPlus, lucideUsersRound } from '@ng-icons/lucide';
import { AuthService } from '../../../../main/auth/services/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, CardComponent, UserAvatarComponent, NgIcon],
  viewProviders: [provideIcons({ lucideUserRound, lucideCog, lucideCreditCard, lucideUsersRound, lucideUserRoundPlus, lucideLayoutList, lucideLogOut })],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.scss'
})
export class ProfileDropdownComponent {
  @Input() user!: BaseAccount;

  constructor(private authService: AuthService) { }

  protected signOut(): void {
    this.authService.signOut();
  }
}
