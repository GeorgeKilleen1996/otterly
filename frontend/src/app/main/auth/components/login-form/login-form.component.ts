import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAtSign, lucideEye, lucideEyeOff, lucideKeyRound } from '@ng-icons/lucide';
import { LoadingSpinnerComponent } from "../../../../UI/components/loading-spinner/loading-spinner.component";
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/auth';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../../UI/services/toast.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIcon, LoadingSpinnerComponent],
  viewProviders: [provideIcons({ lucideKeyRound, lucideAtSign, lucideEye, lucideEyeOff })],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }
  
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
      const loginDetails: LoginDetails =  {
        email: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || ''
      };

      this.authService.login(loginDetails)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.log('Some error here: ', error);
          }
        });
    }
  }

  protected togglePassword() {
    this.hiddenPassword = !this.hiddenPassword;
  }
}