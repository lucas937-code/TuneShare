import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {EMPTY} from "rxjs";

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = authService.accessToken;

  if (!accessToken) {
    router.navigateByUrl('/login').catch(() => console.error('Navigation error occurred'));
    return EMPTY;
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return next(authReq);
};