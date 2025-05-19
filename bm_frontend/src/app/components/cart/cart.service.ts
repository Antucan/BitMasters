import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth.service';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img_url: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private isBrowser: boolean;

  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser && this.authService.getUser()) {
      const stored = localStorage.getItem('cart');
      if (stored) {
        this.items = JSON.parse(stored);
      }
    }
  }

  private saveCart() {
    if (this.isBrowser && this.authService.getUser()) {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  }

  showCart() {
    this.cartVisible.next(true);
  }

  hideCart() {
    this.cartVisible.next(false);
  }

  toggleCart() {
    this.cartVisible.next(!this.cartVisible.getValue());
  }

  addToCart(item: CartItem): boolean {
    const user = this.authService.getUser();
    if (!user) {
      return false; 
    }

    const existing = this.items.find(p => p.id === item.id);
    if (existing) {
      return false; 
    } else {
      this.items.push({ ...item });
      this.saveCart();
      return true;
    }
  }

  removeFromCart(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getTotalItems(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
