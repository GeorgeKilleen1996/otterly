import { Routes } from '@angular/router';
import { LoginPageComponent } from './main/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './main/auth/pages/register-page/register-page.component';
import { ForgottenPasswordPageComponent } from './main/auth/pages/forgotten-password-page/forgotten-password-page.component';
import { authGuard } from './main/auth/guards/auth.guard';
import { IndexPageComponent } from './main/pages/index-page/index-page.component';
import { nonAuthGuard } from './main/auth/guards/non-auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    pathMatch: 'full',
    component: IndexPageComponent
  },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', canActivate: [nonAuthGuard], component: LoginPageComponent },
      { path: 'register', canActivate: [nonAuthGuard], component: RegisterPageComponent },
      { path: 'forgotten-password', canActivate: [nonAuthGuard], component: ForgottenPasswordPageComponent}
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
