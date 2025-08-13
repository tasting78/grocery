import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SignupResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'user@example.com', password: 'user123', role: 'user' }
  ];

  private apiUrl = 'http://localhost:3000/api/users';  // Adjust this if necessary

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate([user.role === 'admin' ? '/admin' : '/users']);
      return true;
    }

    return false;
  }

  signup(userData: any) {
    return this.http.post('http://localhost:3000/api/users/signup', userData);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
