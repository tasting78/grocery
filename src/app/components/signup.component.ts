import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: any = {};
  userType: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  signup() {
    console.log('Submitting:', this.user); // Verify your data
    
    this.authService.signup({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      userType: this.userType
    }).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Check the response
        this.successMessage = 'Signup successful!';
      },
      error: (error) => {
        console.error('API Error:', error); // Inspect the full error
        this.errorMessage = error.error?.message || 'Signup failed';
      }
    });
  }
}