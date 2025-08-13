import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  onLogin(username: string, password: string): void {
    const success = this.authService.login(username, password);
    if (!success) {
      alert('Invalid credentials');
    }
  }
}