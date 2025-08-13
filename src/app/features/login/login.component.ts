// src/app/features/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  userType: string = 'user';
  email = '';
  password = '';
  errorMessage = '';
  isSignupMode = false;

  constructor(private router: Router) {}

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
    this.errorMessage = '';
  }

  submit() {
    if (this.isSignupMode) {
      this.signup();
    } else {
      this.login();
    }
  }

  signup() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email.trim() === this.email.trim());
    
    if (existingUser) {
      this.errorMessage = 'Email is already registered!';
      return;
    }

    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    const newUser = { 
      email: this.email.trim(), 
      password: this.password, 
      userType: this.userType // 'user' or 'seller'
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.navigateBasedOnUserType();
  }

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => 
      u.email.trim() === this.email.trim() && 
      u.password === this.password &&
      u.userType === this.userType // Ensure userType matches
    );

    
    if (!user) {
      this.errorMessage = 'Invalid credentials or account type!';
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.navigateBasedOnUserType();
  }

  private navigateBasedOnUserType() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (user.userType === 'user') {
      this.router.navigate(['/users']); // Plural to match route
    } else if (user.userType === 'seller') {
      this.router.navigate(['/sellers']); // Plural to match route
    } else {
      console.error('Unknown user type:', user.userType);
      this.errorMessage = 'Invalid account type';
    }
  }
}