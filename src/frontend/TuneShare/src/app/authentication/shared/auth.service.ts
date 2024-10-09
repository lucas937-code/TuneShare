import {Injectable} from '@angular/core';
import {BACKEND_URL} from "../../../main";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Session} from "./auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly accessTokenKey: string = 'access_token';
  private _userId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  set accessToken(value: string) {
    localStorage.setItem(this.accessTokenKey, value);
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  get userId(): string | null {
    return this._userId;
  }

  set userId(value: string | null) {
    this._userId = value;
  }

  clearAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  refreshToken(): void {
    const url = `${BACKEND_URL}auth/refresh`;
    this.http.get<Session>(url).subscribe({
      next: (session: Session) => {
        this.accessToken = session.access_token;
      },
      error: () => {
        this.router.navigateByUrl('/login').catch(() => {
          console.error("Fehler bei der Navigation");
        });
      }
    });
  }
}
