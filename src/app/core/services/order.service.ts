import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  getUserOrders(userId: number) {
    // Mock order data
    return [
      { id: 1, item: 'Apples', quantity: 3 },
      { id: 2, item: 'Bananas', quantity: 5 },
    ];
  }
}
