import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
 @Input() type:'horizontal' | null = null;
 @Input() colour!: 'primary' | 'secondary' | 'accent' | 'disabled';

 colourClass: string | null = null;

 ngOnInit() {
  this.colourClass = 'spinner-colour--' + this.colour;
 }
}
