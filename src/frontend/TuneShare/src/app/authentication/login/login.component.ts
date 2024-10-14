import {Component, OnInit} from '@angular/core';
import {ErrorToastComponent} from "../../error-toast/error-toast.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthResponse} from "../shared/auth-response";
import {BACKEND_URL} from "../../../main";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ErrorToastComponent,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

// Login-page
export class LoginComponent implements OnInit {
  readonly window = window;
  private readonly loginUrl: string = `${BACKEND_URL}auth/login/`;

  registerForm!: FormGroup;

  loading: boolean = false;
  showErrorLabel: boolean = false;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    const payload = {email: this.email.value, password: this.password.value};
    this.loading = true;
    this.registerForm.disable();

    this.http.post<AuthResponse>(this.loginUrl, payload).subscribe({
      error: () => {
        this.loading = false;
        this.registerForm.enable();
        this.showErrorLabel = true;
      },
      next: (data: AuthResponse) => {
        this.authService.accessToken = data.session.access_token;
        this.authService.expiresAt = data.session.expires_at;
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    });
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }
}
