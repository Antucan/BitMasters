import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { CommonModule } from '@angular/common';
import { CartService } from './components/cart-preview/cart.service';
import { ProductosComponent } from './components/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent as HeaderComponent_Admin } from "./components/admin/header/header.component";
import { FooterComponent as FooterComponent_Admin } from "./components/admin/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, FooterComponent, HttpClientModule, CartPreviewComponent, ProductosComponent, AdminComponent, HeaderComponent_Admin, FooterComponent_Admin],
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

    }
  }

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cartVisible$.subscribe(value => {
      this.isCartVisible = value;
    });
  }

  isAdminRoute() {
    return this.router.url.startsWith('/admin');
  }

  closeCart() {
    this.cartService.hideCart();
  }
}
