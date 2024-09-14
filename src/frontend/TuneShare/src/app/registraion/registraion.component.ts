import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-registraion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    JsonPipe,
    NgOptimizedImage,
    HttpClientModule
  ],
  templateUrl: './registraion.component.html',
  styleUrl: './registraion.component.scss'
})
export class RegistraionComponent implements OnInit{
  private registrationUrl: string = "http://localhost:8000/register/";

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
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
    const payload = { email: this.email.value, password: this.password.value };
    this.http.post(this.registrationUrl, payload).subscribe();
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

  sagHallo() {
    return this.http.get("http://localhost:8000/test/josiiii").subscribe();
  }
}
