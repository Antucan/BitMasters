import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})
export class CartPreviewComponent {
  isVisible: boolean = false;

  constructor(
    private router: Router,
    public cartService: CartService,
    private authService: AuthService
  ) {
    this.cartService.cartVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.getUser() !== null;
  }

  get items() {
    return this.cartService.getItems();
  }

  get totalItems() {
    return this.cartService.getTotalItems();
  }

  get totalPrice() {
    return this.cartService.getTotalPrice();
  }

  goToCart() {
    this.cartService.hideCart();
    this.router.navigate(['/cesta']);
  }

  closeCart() {
    this.cartService.hideCart();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }
}
