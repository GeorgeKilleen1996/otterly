import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAtSign, lucideEye, lucideEyeOff, lucideKeyRound } from '@ng-icons/lucide';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIcon],
  viewProviders: [provideIcons({ lucideKeyRound, lucideAtSign, lucideEye, lucideEyeOff })],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  
  loading:boolean = false;
  hiddenPassword:boolean = true;
  
  
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  protected login() {
    if (this.loginForm.valid) {
      this.loading = true;
      // Your login logic here
      // Don't forget to set loading back to false after API call
    }
  }

  protected togglePassword() {
    this.hiddenPassword = !this.hiddenPassword;
  }
}