import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserAvatarComponent } from '../../../../UI/components/user-avatar/user-avatar.component';
import { AuthService } from '../../../../main/auth/services/auth.service';
import { BaseAccount } from '../../../../main/auth/interfaces/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  constructor(private authService: AuthService) {}

  activeUser: BaseAccount | null = this.authService.getAccount();
}
