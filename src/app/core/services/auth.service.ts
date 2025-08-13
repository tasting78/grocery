import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  private apiUrl = 'http://localhost:3000/api/users'; // Update if your backend URL is different

  constructor(private http: HttpClient, private router: Router) {
    // Simulate fetching user details from local storage or an API
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject.next(storedUser);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getUserDetails(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  setUserDetails(user: any) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    console.log('User logged out');
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  signup(userData: { 
    name: string; 
    email: string; 
    password: string; 
    userType: string 
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData).pipe(
      tap({
        next: () => {
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true' }
          });
        },
        error: (err) => {
          console.error('Signup error:', err);
          throw err; // Re-throw to handle in component
        }
      })
    );
  }
}
