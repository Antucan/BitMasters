import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../cart/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() deleted = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  removeProduct() {
    this.cartService.removeFromCart(this.item.id);
    this.deleted.emit(); 
  }
}
