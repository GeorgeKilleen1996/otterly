import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginDetails, LoginInformation, LoginRequestResponse, LoginState } from '../interfaces/auth';
import { BehaviorSubject, catchError, map, of, Subject, take } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginInformation: LoginInformation | null = null
  private platformId = inject(PLATFORM_ID);

  private loginState$!: BehaviorSubject<LoginState>

  constructor(private apiService: AuthApiService, private router: Router) {
    this.loadLoginInformation()
    this.updateLoginState()

    this.loginState$.subscribe(state => console.log('loginState', state))
  }

  loadLoginInformation() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const loginInformation = localStorage.getItem('otterlyLoginInformation')
        if (loginInformation) this.loginInformation = JSON.parse(loginInformation)
      } catch (error) {
        console.error('Error loading login information:', error);
      }
    }
  }

  saveLoginInformation() {
    localStorage.setItem('otterlyLoginInformation', JSON.stringify(this.loginInformation))
  }

  getLoginState() {
    return this.loginState$.asObservable()
  }

  updateLoginState() {
    const state: LoginState = {
      loggedIn: this.isLoggedIn(),
      account: this.getAccount(),
    }

    if (!this.loginState$) this.loginState$ = new BehaviorSubject<LoginState>(state)
    else this.loginState$.next(state)
  }

  isLoggedIn() {
    return this.loginInformation !== null
  }

  getAccount() {
    return this.loginInformation?.account ?? null
  }

  login(loginDetails: LoginDetails) {
    const loginState = new Subject<LoginRequestResponse>()

    this.apiService
      .getToken(loginDetails)
      .pipe(
        catchError(err => {
          console.error(err)
          loginState.next({ status: 'error' })
          loginState.complete()
          return []
        })
      )
      .subscribe(token => {
        if (token.two_factor_required) {
          // console.log('session', token.session)
          loginState.next({ status: 'twoFactorRequired', session: token.session })
          loginState.complete()
        } else {
          this.apiService
            .getAccountDetailsForToken(token)
            .pipe(
              catchError(err => {
                console.error(err)
                loginState.next({ status: 'error' })
                loginState.complete()
                return []
              })
            )
            .subscribe(account => {
              console.log('account', account)
              this.loginInformation = {
                token: token.token ?? '',
                account: account,
              }

              this.saveLoginInformation()
              this.updateLoginState()
              loginState.next({ status: 'loggedIn' })
              loginState.complete()
            })
        }
      })

    return loginState
  }

  refreshAccountDetails() {
    const token = this.loginInformation?.token
    if (!token) return of(null)

    return this.apiService
      .getAccountDetailsForToken({
        token: token,
      })
      .pipe(
        take(1),
        map(account => {
          this.loginInformation = {
            token,
            account,
          }

          this.saveLoginInformation()
          this.updateLoginState()

          return account
        })
      )
  }
}
