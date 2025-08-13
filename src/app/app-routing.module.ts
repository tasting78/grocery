import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { UsersComponent } from './features/users/users.component';
import { HomeComponent } from './features/home/home.component'; // Import the HomeComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Redirect unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
