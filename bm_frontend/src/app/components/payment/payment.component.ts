import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../auth.service';
import { addPurchase } from './payment.service';
import { error } from 'node:console';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  providers: [addPurchase]
})
export class PaymentComponent {
  user_id: number = 0;
  totalPrice: number = 0;
  cardName = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  loginVisible = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private purchase: addPurchase

  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });

    const user = this.authService.getUser();
    if (user) {
      this.totalPrice = this.cartService.getTotalPrice();
    } else {
      this.totalPrice = 0;
    }
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user.id; // Asignamos el ID del usuario
        console.log('User detected in AddProductComponent: ', this.user_id);
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.getUser() !== null;
  }

  confirmPayment() {
    alert('Pago realizado correctamente con tarjeta');
    this.cartService.getItems().forEach(element => {
      this.purchase.postPurchase(this.user_id, element.id, element.quantity).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
    });
    // Borra todos los productos en la cesta
    this.cartService.removeAllItems();

    // Redirige a la página principal
    this.router.navigate(['/']);
  }

  abrirLogin() {
    this.loginService.showLogin();
  }
}
