import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {EMPTY, switchMap} from "rxjs";

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls: string[] = ['/auth/login/', '/auth/register/', '/auth/refresh/'];

  if (excludedUrls.some(url => req.url.includes(url)))
    return next(req);

  const authService = inject(AuthService);

  const accessToken = authService.accessToken;
  const csrfToken = authService.getCsrfCookie();

  if (authService.tokenIsExpired || !accessToken) {
    return authService.refreshToken().pipe(
      switchMap(newToken => {
        const updatedAccessToken = newToken || accessToken;
        if (!updatedAccessToken) {
          authService.logout();
          return EMPTY;
        }
        const authReq = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${updatedAccessToken}`,
            'X-CSRFToken': csrfToken
          },
          withCredentials: true
        });
        return next(authReq);
      })
    );
  }


  const authReq = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${accessToken}`,
      'X-CSRFToken': csrfToken
    },
    withCredentials: true
  })
  return next(authReq);
}
