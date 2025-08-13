import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Consider moving this to an environment file

  constructor(private http: HttpClient, private router: Router) { }

  signup(userData: { 
    name: string; 
    email: string; 
    password: string; 
    userType: string 
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData).pipe(
      tap({
        next: (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup error', err);
          // Provide meaningful error messages
          if (err.status === 400) {
            console.error('Validation error:', err.error.message);
          } else if (err.status === 500) {
            console.error('Server error:', err.error.message);
          } else {
            console.error('Unexpected error:', err.message);
          }
          throw err; // Re-throw to handle in component
        }
      })
    );
  }
}