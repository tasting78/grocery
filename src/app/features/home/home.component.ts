import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="home-container"><h1>Welcome to the Home Page</h1></div>`,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 24px;
      color: #333;
    }
  `]
})
export class HomeComponent {}
