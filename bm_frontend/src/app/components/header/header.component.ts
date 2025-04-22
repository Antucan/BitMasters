import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BannerComponent } from '../banner/banner.component';
import { CartService } from '../cart-preview/cart.service';
import { LoginService } from '../login/login.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged: boolean = false;
  constructor(private router: Router, private cartService: CartService, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.logged = !!user; // Cambia a true si hay un usuario, false si no
      console.log('User:', user, 'Logged:', this.logged);
    });
  }

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