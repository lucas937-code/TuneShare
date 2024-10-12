import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls: string[] = ['/auth/login/', '/auth/register/', '/auth/refresh/'];

  if (excludedUrls.some(url => req.url.includes(url)))
    return next(req);

  const authService = inject(AuthService);

  const accessToken = authService.accessToken;

  if (authService.tokenIsExpired || !accessToken) {
    authService.refreshToken();
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return next(authReq);
};
