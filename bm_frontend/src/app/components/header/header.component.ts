import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BannerComponent } from '../banner/banner.component';

import { CartService } from '../cart-preview/cart.service';



import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private cartService: CartService, private loginService: LoginService) {}

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  showLogin() {
    this.loginService.showLogin();
  }

 

  onCartClick() {
    this.cartService.showCart(); // muestra el carrito
  }

}