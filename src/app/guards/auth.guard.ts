// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = next.data['requiredRole'];
    if (user.userType !== requiredRole) {
      const redirectPath = user.userType === 'user' ? '/users' : '/sellers';
      this.router.navigate([redirectPath]);
      return false;
    }

    return true;
  }
}