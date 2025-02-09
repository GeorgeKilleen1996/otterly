import { Routes } from '@angular/router';
import { LoginPageComponent } from './main/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './main/auth/pages/register-page/register-page.component';
import { ForgottenPasswordPageComponent } from './main/auth/pages/forgotten-password-page/forgotten-password-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'forgotten-password', component: ForgottenPasswordPageComponent}
    ]
  }
];
