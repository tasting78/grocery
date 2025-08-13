import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  userType: string = 'user';
  isLoading = false;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {}

  signup() {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Validate fields
    if (!this.user.name || !this.user.email || !this.user.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required!';
      this.isLoading = false;
      return;
    }

    if (!this.user.email.includes('@')) {
      this.errorMessage = 'Invalid email format!';
      this.isLoading = false;
      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters!';
      this.isLoading = false;
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      this.isLoading = false;
      return;
    }

    // Prepare data for API
    const userData = {
      name: this.user.name.trim(),
      email: this.user.email.trim(),
      password: this.user.password.trim(),
      userType: this.userType
    };

    // Call AuthService
    this.http.post('http://localhost:3000/api/signup', userData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Signup successful! You can now log in.';
        this.user = { name: '', email: '', password: '' };
        this.confirmPassword = '';
        this.isLoading = false;
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: any) => {
        console.error('Signup error:', err);
        this.errorMessage = err.error?.message || 'Signup failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}