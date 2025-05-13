import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  totalPrice: number = 0;
  cardName = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  loginVisible = false;

  constructor(private cartService: CartService, private router: Router, private loginService: LoginService) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
    this.totalPrice = this.cartService.getTotalPrice();
  }

  confirmPayment() {
    alert('Pago realizado correctamente con tarjeta');
    this.router.navigate(['/']);
  }
}
