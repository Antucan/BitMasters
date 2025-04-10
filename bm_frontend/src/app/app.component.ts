import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { CommonModule } from '@angular/common';
import { CartService } from './components/cart-preview/cart.service';
import { ProductosComponent } from './components/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule,
    FooterComponent,
    HttpClientModule,
    ProductosComponent,
    CartPreviewComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCartVisible = false;

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  redirectTo(route: string) {
    if (route === '/cart') {
      this.toggleCart();
    } else {
      // Lógica de redirección aquí
    }
  }

  constructor(private cartService: CartService) {
    this.cartService.cartVisible$.subscribe(value => {
      this.isCartVisible = value;
    });
  }

  closeCart() {
    this.cartService.hideCart();
  }
}