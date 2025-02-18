import {
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpContextToken,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development'; 

export const AUTO_CONVERT_CASE = new HttpContextToken(() => true);

// Helper functions
function convertCase(str: string, convertTo: 'camel' | 'snake'): string {
  if (convertTo === 'snake') {
    return str.replace(/([A-Z0-9])/g, '_$1').toLowerCase();
  }
  return str.replace(/_([a-z0-9])/g, g => g[1].toUpperCase());
}

function convertObject(obj: any, convertTo: 'camel' | 'snake'): any {
  // Add logging to debug the conversion

  if (obj instanceof FormData) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => convertObject(item, convertTo));
  }
  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      const newKey = convertCase(key, convertTo);
      const newValue = convertObject(obj[key], convertTo);
      newObj[newKey] = newValue;
    }
    return newObj;
  }
  return obj;
}

// Standalone interceptor function
export const snake2CamInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Log the request URL and context
  
  // Skip if the request is not from the api
  if (!req.url.startsWith(environment.baseApiUrl)) {
    return next(req);
  }
  if (req.url.includes('graphql')) {
    return next(req);
  }
  
  const shouldSkip = req.context.get(AUTO_CONVERT_CASE) === false;
  if (shouldSkip) {
    return next(req);
  }

  // convert request body from camel case to snake case
  if (req.body) {
    const convertedBody = convertObject(req.body, 'snake');
    req = req.clone({ body: convertedBody });
  }

  // convert response body from snake case to camel case
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
      }
    }),
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.body) {
        const body = convertObject(event.body, 'camel');
        return event.clone({ body });
      }
      return event;
    })
  );
};