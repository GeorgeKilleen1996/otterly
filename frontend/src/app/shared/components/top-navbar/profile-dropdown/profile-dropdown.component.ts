import { Component, Input } from '@angular/core';
import { BaseAccount } from '../../../../main/auth/interfaces/auth';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../UI/components/card/card.component';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.scss'
})
export class ProfileDropdownComponent {
  @Input() user!: BaseAccount;
}
