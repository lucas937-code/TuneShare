import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorToastComponent} from "../../error-toast/error-toast.component";
import {AuthResponse} from "../shared/auth-response";
import {BACKEND_URL} from "../../../main";
import {AuthService} from "../shared/auth.service";
import {usernameAvailable} from "../shared/username-validator";

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

// Registration Page
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
      displayName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._]{2,29}(?<!\.)$/)], [usernameAvailable(this.authService)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\w)(?!.* ).{8,}$/)]),
      repeatPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      display_name: this.displayName.value
    };
    this.loading = true;
    this.registerForm.disable();

    this.http.post<AuthResponse>(this.registrationUrl, payload).subscribe({
      next: (data: AuthResponse) => {
        this.authService.accessToken = data.session.access_token;
        this.authService.expiresAt = data.session.expires_at;
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

  get displayName(): AbstractControl {
    return this.registerForm.controls['displayName'];
  }

  get displayNameErrorLabel(): string {
    if (this.displayName.hasError('required'))
      return "Display Name is required";
    else if (this.displayName.hasError('maxlength'))
      return "Display Name too long (max 30 characters)";
    else if (this.displayName.hasError('minlength'))
      return "Display name too short (min 3 characters)"
    else return "Display Name invalid";
  }

  get username(): AbstractControl {
    return this.registerForm.controls['username'];
  }

  get usernameErrorLabel(): string {
    if (this.username.hasError('required'))
      return "Username is required";
    else if (this.username.hasError('maxlength'))
      return "Username too long (max 30 characters)";
    else if (this.username.hasError('isTaken'))
      return "Username is already taken";
    return "Username invalid";
  }

  get email(): AbstractControl {
    return this.registerForm.controls['email'];
  }

  get emailErrorLabel(): string {
    if (this.email.hasError('required'))
      return "Email is required";
    else return "Email is not valid";
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }

  get passwordErrorLabel(): string {
    if (this.password.hasError('required'))
      return "Password is required";
    else if (this.password.hasError('pattern'))
      return "Password not strong enough";
    else return "Password is not valid";
  }

  get repeatPassword(): AbstractControl {
    return this.registerForm.controls['repeatPassword'];
  }
}
