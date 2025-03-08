import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginDetails, LoginInformation, LoginRequestResponse, LoginState } from '../interfaces/auth';
import { BehaviorSubject, catchError, map, of, Subject, take, throwError } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ToastService } from '../../../UI/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginInformation: LoginInformation | null = null;
  private platformId = inject(PLATFORM_ID);
  private loginStateSubject = new BehaviorSubject<LoginState>({ loggedIn: false, account: null });
  loginState$ = this.loginStateSubject.asObservable();

  constructor(private apiService: AuthApiService, private router: Router, private toastService: ToastService) {
    this.loadLoginInformation();
    this.updateLoginState();

    this.loginState$.subscribe(state => console.log('loginState', state));
  }

  private loadLoginInformation() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const loginInformation = localStorage.getItem('otterlyLoginInformation');
        if (loginInformation) {
          this.loginInformation = JSON.parse(loginInformation);
          this.updateLoginState();
        }
      } catch (error) {
        console.error('Error loading login information:', error);
      }
    }
  }

  private saveLoginInformation() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('otterlyLoginInformation', JSON.stringify(this.loginInformation));
    }
  }

  getLoginState() {
    return this.loginState$;
  }

  private updateLoginState() {
    const state: LoginState = {
      loggedIn: this.isLoggedIn(),
      account: this.getAccount(),
    };
    this.loginStateSubject.next(state);
  }

  isLoggedIn(): boolean {
    return this.loginInformation !== null;
  }

  getAccount() {
    return this.loginInformation?.account ?? null;
  }

  login(loginDetails: LoginDetails) {
    const loginState = new Subject<LoginRequestResponse>();

    this.apiService
      .getToken(loginDetails)
      .pipe(
        catchError(err => {
          this.toastService.error('Invalid email or password');
          loginState.next({ status: 'error' });
          loginState.complete();
          return throwError(() => err);
        })
      )
      .subscribe(token => {
        if (token.two_factor_required) {
          loginState.next({ status: 'twoFactorRequired', session: token.session });
          loginState.complete();
        } else {
          this.apiService
            .getAccountDetailsForToken(token)
            .pipe(
              catchError(err => {
                loginState.next({ status: 'error' });
                loginState.complete();
                return throwError(() => err);
              })
            )
            .subscribe(account => {
              this.loginInformation = {
                token: token.token ?? '',
                account: account,
              };

              this.saveLoginInformation();
              this.updateLoginState();
              loginState.next({ status: 'loggedIn' });
              loginState.complete();
            });
        }
      });

    return loginState;
  }

  signOut() {
    this.loginInformation = null;
    this.saveLoginInformation();
    this.updateLoginState();
    this.router.navigate(['/auth/login']);
  }

  refreshAccountDetails() {
    const token = this.loginInformation?.token;
    if (!token) return of(null);

    return this.apiService
      .getAccountDetailsForToken({ token })
      .pipe(
        take(1),
        map(account => {
          this.loginInformation = {
            token,
            account,
          };

          this.saveLoginInformation();
          this.updateLoginState();

          return account;
        })
      );
  }
}
