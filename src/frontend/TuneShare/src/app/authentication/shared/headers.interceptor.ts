import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  return next(authReq);
};
