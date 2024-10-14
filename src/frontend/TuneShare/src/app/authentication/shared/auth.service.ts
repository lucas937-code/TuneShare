import {Injectable} from '@angular/core';
import {BACKEND_URL} from "../../../main";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Session} from "./auth-response";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly accessTokenKey: string = 'access_token';
  private readonly expiresAtKey: string = 'token_expires_at';

  constructor(private http: HttpClient, private router: Router) {
  }

  set accessToken(value: string) {
    localStorage.setItem(this.accessTokenKey, value);
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  set expiresAt(value: number) {
    localStorage.setItem(this.expiresAtKey, value.toString())
  }

  get tokenIsExpired(): boolean {
    const expiresAt: string | null = localStorage.getItem(this.expiresAtKey);
    if (expiresAt === null) {
      return true;
    }
    const expiresAtNum = +expiresAt;
    const currentTime = Math.floor(Date.now() / 1000)
    return expiresAtNum < currentTime;
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  refreshToken(): Observable<string | null> {
    const url = `${BACKEND_URL}auth/refresh`;
    return this.http.get<Session>(url).pipe(
      map((session: Session) => {
        this.accessToken = session.access_token;
        return session.access_token;
      }),
      catchError(() => {
        this.router.navigateByUrl('/login').catch(() => console.error('Error occurred while navigating'));
        return of(null);
      }));
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.expiresAtKey);
    this.router.navigateByUrl('/').catch(() => console.error('Error occurred while logging out'));
  }

  getCsrfCookie() {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `csrftoken=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
