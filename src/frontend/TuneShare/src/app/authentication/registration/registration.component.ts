import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorToastComponent} from "../../error-toast/error-toast.component";
import {AuthResponse} from "../shared/auth-response";
import {BACKEND_URL} from "../../../main";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    NgOptimizedImage,
    ErrorToastComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  readonly window = window;
  private readonly registrationUrl: string = `${BACKEND_URL}auth/register/`;

  registerForm!: FormGroup;

  loading: boolean = false;
  showToast: boolean = false;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\w)(?!.* ).{8,}$/)]),
      repeatPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    const payload = {email: this.email.value, password: this.password.value};
    this.loading = true;
    this.registerForm.disable();

    this.http.post<AuthResponse>(this.registrationUrl, payload).subscribe({
      next: (data: AuthResponse) => {
        this.authService.accessToken = data.session.accessToken;
        this.loading = false;
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error.error?.error || "Unknown error occurred");
        this.loading = false;
        this.registerForm.reset();
        this.registerForm.enable();
        this.showToast = true;
      }
    });
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get repeatPassword() {
    return this.registerForm.controls['repeatPassword'];
  }
}
