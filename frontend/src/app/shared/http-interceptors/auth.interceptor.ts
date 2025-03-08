import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../../main/auth/services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';

const addAuthHeader = (req: HttpRequest<any>, authService: AuthService): HttpRequest<any> => {
  const loginInfo = authService.loginInformation;

  if (loginInfo) {
    return req.clone({
      setHeaders: {
        Authorization: `Token ${loginInfo.token}`,
      },
    });
  }
  return req;
};

const handleResponseError = (err: any) => {
  console.log(err);
  if (err.status === 401 || err.error?.detail?.includes('Invalid token')) {
    // const authService = inject(AuthService);
    // authService.logout();
  }
  return throwError(() => err);
};

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  // Get AuthService using inject
  const authService = inject(AuthService);

  // Skip if the request is related to auth
  if (!req.url.startsWith(`${environment.baseApiUrl}`) || 
      req.url.startsWith(`${environment.baseApiUrl}/auth/`)) {
    return next(req);
  }

  // Add auth header to request
  const modifiedReq = addAuthHeader(req, authService);

  // Add error handler to request
  return next(modifiedReq).pipe(
    catchError(err => handleResponseError(err))
  );
};
