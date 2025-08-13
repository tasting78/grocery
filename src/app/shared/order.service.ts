import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: any[] = []; // Store orders in memory

  addOrder(order: any) {
    this.orders.push(order); // Add a new order
  }

  getOrders() {
    return this.orders; // Return all orders
  }
}
