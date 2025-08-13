import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ Add CUSTOM_ELEMENTS_SCHEMA here
})
export class AppComponent {
  showNavbar = true;
  signupForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/login' && this.router.url !== '/signup'; 
    });
    this.signupForm = this.fb.group({
      userType: ['user', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }
}
