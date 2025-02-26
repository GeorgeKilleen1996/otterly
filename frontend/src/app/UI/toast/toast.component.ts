import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleAlert, lucideCircleCheck, lucideCircleX, lucideInfo, lucideX } from '@ng-icons/lucide';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({ lucideCircleCheck, lucideInfo, lucideCircleAlert, lucideCircleX, lucideX })],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  private icons = {
    success: 'lucideCircleCheck',
    info: 'lucideInfo',
    warning: 'lucideCircleAlert',
    error: 'lucideCircleX',
  }
  @Input() set type(value: 'success' | 'info' | 'warning' | 'error') {
    this.type$.next(value)
    this.icon$.next(this.icons[value])
  }

  @Input() set icon(value: string) {
    this.icon$.next(value)
  }

  @Input() urgent: boolean = false

  type$ = new BehaviorSubject<string>('info')
  icon$ = new BehaviorSubject<string>('heroCheckCircle')

  close() {
    this.urgent = false
  }
}
