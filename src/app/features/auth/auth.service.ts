import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    // ...existing login logic...
    const isAuthenticated = /* logic to validate user */;
    if (isAuthenticated) {
      this.router.navigate(['/users']); // Redirect to UsersComponent
    }
    return isAuthenticated;
  }
}