import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  currentUser: any;
  orders: any[] = [];
  wishlist: any[] = [];
  activeTab: string = 'profile';
  isLoading: boolean = true;

  originalUser = {
    name: '',
    email: ''
  };

  editableUser = {
    name: '',
    email: ''
  };

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to user details from AuthService
    this.authService.getUserDetails().subscribe(
      (user) => {
        if (user) {
          this.currentUser = user;
          this.originalUser = {
            name: this.currentUser?.name || '',
            email: this.currentUser?.email || ''
          };
          this.editableUser = { ...this.originalUser }; // Initialize editableUser with originalUser
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );

    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    try {
      this.orders = this.orderService.getUserOrders(this.currentUser?.id);
      this.wishlist = []; // Add wishlist service logic here
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  updateProfile() {
    // Save changes to originalUser
    this.originalUser = { ...this.editableUser };
    console.log('Profile updated:', this.originalUser);
  }
}
