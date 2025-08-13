// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { SellersComponent } from './features/sellers/sellers.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserAccountComponent } from './features/user-account/user-account.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'users', 
    component: UsersComponent, 
    canActivate: [AuthGuard],
    data: { requiredRole: 'user' }
  },
  { 
    path: 'sellers', 
    component: SellersComponent, 
    canActivate: [AuthGuard],
    data: { requiredRole: 'seller' }
  },
  { 
    path: 'user-account', 
    component: UserAccountComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: ['user', 'seller'] } // Accessible to both roles
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];