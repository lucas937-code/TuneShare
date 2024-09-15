import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgClass,
        JsonPipe,
        NgOptimizedImage,
        HttpClientModule
    ],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
    readonly window = window;
    private readonly registrationUrl: string = "http://localhost:8000/register/";

    registerForm!: FormGroup;

    loading: boolean = false;
    showToast: boolean = false;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
            password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\w)(?!.* ).{8,}$/)]),
            repeatPassword: new FormControl('', [Validators.required]),
            checkbox: new FormControl(false, Validators.requiredTrue)
        });
    }

    onSubmit(): void {
        const payload = {email: this.email.value, password: this.password.value};
        this.loading = true;
        this.registerForm.disable();

        this.http.post(this.registrationUrl, payload).subscribe({
            error: () => {
                this.loading = false;
                this.registerForm.reset();
                this.registerForm.enable();
                this.showToast = true;
                setTimeout(() => this.showToast = false, 5000);
            },
            complete: () => {
                this.loading = false;
                this.router.navigate(['/']);
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
