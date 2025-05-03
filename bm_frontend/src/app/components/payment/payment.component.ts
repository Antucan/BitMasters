import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  totalPrice: number = 0;

  cardName = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';

  constructor(private cartService: CartService, private router: Router) {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  confirmPayment() {
    alert('Pago realizado correctamente con tarjeta');
    this.router.navigate(['/']);
  }
}
