import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideCalendar, lucideCommand, lucideMail, lucideMoon, lucideSearch, lucideSun } from '@ng-icons/lucide';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Overlay, OverlayConfig, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, NgIcon, UserProfileComponent, OverlayModule, PortalModule, ProfileDropdownComponent ],
  viewProviders: [provideIcons({ lucideBell, lucideMoon, lucideSun, lucideCalendar, lucideSearch, lucideCommand, lucideMail })],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  // @ViewChild('profileMenuButton', { static: false }) profileMenuButton!: ElementRef;

  // constructor(private overlay: Overlay) { }

  // private overlayRef: OverlayRef | null = null;

  // openProfileDropdown() {
  //   if (this.overlayRef) {
  //     this.closeOverlay();
  //     return;
  //   }

  //   const positionStrategy = this.overlay.position()
  //     .flexibleConnectedTo(this.profileMenuButton)
  //     .withPositions([{
  //       originX: 'end',
  //       originY: 'bottom',
  //       overlayX: 'end',
  //       overlayY: 'top',
  //       offsetY: 8 // Adds a small gap between trigger and dropdown
  //     }]);

  //   this.overlayRef = this.overlay.create({
  //     hasBackdrop: true,
  //     backdropClass: 'cdk-overlay-transparent-backdrop',
  //     positionStrategy,
  //     scrollStrategy: this.overlay.scrollStrategies.reposition()
  //   });

  //   const dropdown = new ComponentPortal(ProfileDropdownComponent);
  //   const dropdownOverlayRef = this.overlayRef.attach(dropdown);

  //   this.overlayRef.detachments().subscribe(() => (this.overlayRef = null));
  //   this.overlayRef.backdropClick().subscribe(() => {
  //     this.closeOverlay();
  //   });
  // }

  // closeOverlay() {
  //   if (this.overlayRef) {
  //     this.overlayRef.detach();
  //     this.overlayRef = null;
  //   }
  // }
}
