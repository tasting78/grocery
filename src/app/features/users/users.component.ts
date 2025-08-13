// src/app/features/users/users.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { OrderService } from '../../shared/order.service'; // Corrected import path
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule], // Add ReactiveFormsModule here
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  currentUser: any;
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  sellers: string[] = [];
  searchTerm: string = '';
  selectedSeller: string = '';
  categories = [
    { id: 1, name: 'Fruits', icon: 'assets/fresh-fruits.webp' },
    { id: 2, name: 'Vegetables', icon: 'assets/fresh-vegetables.webp' },
    { id: 3, name: 'Dairy', icon: 'assets/fresh-dairy.png' },
    { id: 4, name: 'Bakery', icon: 'assets/bakery.webp' },
    { id: 5, name: 'Beverages', icon: 'assets/drinks.jpg' }
  ];

  cart: any[] = []; // Array to store cart items
  isCartPanelVisible: boolean = false; // Track cart panel visibility
  isAddressModalVisible = false;
  isPaymentModalVisible = false;
  address: string = '';

  // Address-related properties
  userAddresses: any[] = []; // Initialize as an empty array
  selectedAddressId: number | null = null;
  isAddAddressModalVisible = false;

  // Payment-related properties
  paymentMethods = [
    { id: 1, name: 'Credit Card', icon: 'assets/icons/credit-card.png' },
    { id: 2, name: 'PayPal', icon: 'assets/icons/paypal.png' }
  ];
  selectedPaymentMethod: number | null = null;
  deliveryCharge = 50;

  // Order-related properties
  isConfirmationModalVisible = false;
  currentOrderId: string | null = null;

  // Form for adding a new address
  addressForm: FormGroup;

  constructor(private router: Router, private orderService: OrderService, private fb: FormBuilder) { // Inject the service
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!this.currentUser?.email || this.currentUser.userType !== 'user') {
      this.router.navigate(['/login']);
    }
    this.loadProducts();

    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  private getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  loadProducts() {
    this.allProducts = this.getProducts();
    this.filteredProducts = [...this.allProducts];
    this.sellers = [...new Set(this.allProducts.map(p => p.sellerEmail))];
  }

  filterProducts() {
    this.filteredProducts = this.allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesSeller = !this.selectedSeller || product.sellerEmail === this.selectedSeller;
      return matchesSearch && matchesSeller;
    });
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if product already in cart
    } else {
      this.cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }
    console.log('Cart:', this.cart); // Log the cart for debugging
  }

  toggleCartPanel(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    this.isCartPanelVisible = !this.isCartPanelVisible;
  }

  closeCartPanel(): void {
    this.isCartPanelVisible = false;
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item.id !== product.id);
  }

  viewCart() {
    console.log('Viewing cart:', this.cart);
    // Add logic to navigate to the cart page or display the cart modal
  }

  openAddressModal() {
    this.isAddressModalVisible = true;
  }

  closeAddressModal() {
    this.isAddressModalVisible = false;
  }

  placeOrder() {
    this.isPaymentModalVisible = false;
    alert('Order placed successfully!');
    // Add logic to clear the cart and reset the state
    this.cart = [];
    this.closeCartPanel();
  }

  calculateTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Address-related methods
  selectAddress(addressId: number): void {
    this.selectedAddressId = addressId;
  }

  openAddAddressModal(): void {
    this.isAddAddressModalVisible = true;
  }

  closeAddAddressModal(): void {
    this.isAddAddressModalVisible = false;
  }

  saveAddress(): void {
    if (this.addressForm.valid) {
      const newAddress = { id: Date.now(), ...this.addressForm.value };
      this.userAddresses.push(newAddress); // Add the new address to the list
      this.addressForm.reset(); // Reset the form
      this.closeAddAddressModal(); // Close the modal
    }
  }

  // Payment-related methods
  selectPaymentMethod(methodId: number): void {
    this.selectedPaymentMethod = methodId;
  }

  backToAddress(): void {
    this.isPaymentModalVisible = false;
    this.isAddressModalVisible = true;
  }

  confirmPayment(): void {
    if (this.selectedPaymentMethod) {
      this.currentOrderId = `ORD-${Date.now()}`;
      this.isPaymentModalVisible = false;
      this.isConfirmationModalVisible = true;
    }
  }

  // Order-related methods
  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
  }

  // Other methods
  cancelOrder(): void {
    this.isAddressModalVisible = false;
    this.isAddAddressModalVisible = false;
    this.isPaymentModalVisible = false;
  }

  proceedToPayment(): void {
    if (this.selectedAddressId) {
      this.isAddressModalVisible = false;
      this.isPaymentModalVisible = true;
    }
  }
}