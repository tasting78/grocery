// src/app/features/sellers/sellers.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/order.service'; // Corrected import path

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent {
  currentUser: any;
  products: any[] = [];
  newProduct: any = {
    name: '',
    price: null,
    description: '',
    image: ''
  };
  orders: any[] = []; // Store the orders

  constructor(private router: Router, private orderService: OrderService) { // Inject the service
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.currentUser?.email || this.currentUser.userType !== 'seller') {
      this.router.navigate(['/login']);
    }
    this.loadProducts();
  }

  ngOnInit() {
    this.orders = this.orderService.getOrders(); // Retrieve orders on initialization
  }

  private getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  private saveProducts(products: any[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  loadProducts() {
    this.products = this.getProducts().filter((p: any) => p.sellerEmail === this.currentUser.email);
  }

  addProduct() {
    const products = this.getProducts();
    const product = {
      ...this.newProduct,
      id: Date.now().toString(),
      sellerEmail: this.currentUser.email,
      createdAt: new Date().toISOString()
    };

    products.push(product);
    this.saveProducts(products);
    this.loadProducts();
    this.newProduct = { name: '', price: null, description: '', image: '' };
  }

  deleteProduct(productId: string) {
    const products = this.getProducts().filter((p: any) => p.id !== productId);
    this.saveProducts(products);
    this.loadProducts();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}