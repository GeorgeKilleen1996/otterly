import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("NON AUTH GUARD")
  // console.log(document.cookie)
  
  console.log("ayo")

  if (authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
