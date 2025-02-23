import { Component, Input } from '@angular/core';
import { BaseAccount } from '../../../main/auth/interfaces/auth';

@Component({
  selector: 'ui-user-avatar',
  standalone: true,
  imports: [],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  @Input() user!: BaseAccount;

  getInitials(): string {
    const firstInitial = this.user.firstName ? this.user.firstName.charAt(0).toUpperCase() : '';
    const lastInitial = this.user.lastName ? this.user.lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }
}
