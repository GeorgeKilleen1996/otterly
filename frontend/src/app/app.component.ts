import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './UI/animations/animation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastComponent } from './UI/toast/toast.component';
import { ToastService } from './UI/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    fadeAnimation,
    trigger('toast', [
      state('void', style({ opacity: 0, transform: 'translateY(-4px)', height: '0' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)', height: '*' })),
      transition(':enter', [animate('0.2s ease-out')]),
      transition(':leave', [animate('0.2s ease-out')]),
    ]),
  ],
})
export class AppComponent {

  constructor(protected toastService: ToastService) { }
  title = 'Otterly';
}
