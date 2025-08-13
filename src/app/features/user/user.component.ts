import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-user',
  template: '<h1>User Dashboard</h1>',
  standalone: true,
})
export class UserComponent {
  constructor(private router: Router) {} // Inject Router
}
