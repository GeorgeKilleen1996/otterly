import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAccount, LoginDetails, TokenDetails } from '../interfaces/auth';
import { environment } from '../../../environments/environment.development';
import { catchError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  getToken(loginDetails: LoginDetails) {
    return this.http.post<TokenDetails>(`${environment.baseApiUrl}/auth/token/`, loginDetails)
  }

  getAccountDetailsForToken(tokenDetails: TokenDetails) {
    const subject = new Subject<BaseAccount>()
    this.http
      .get<BaseAccount>(`${environment.baseApiUrl}/users/me/`, {
        headers: { Authorization: `Token ${tokenDetails.token}` },
      })
      .pipe(
        catchError(err => {
          subject.error(err)
          return subject
        })
      )
      .subscribe(user => {
        subject.next(user)
        subject.complete()
      })
    return subject
  }
}
