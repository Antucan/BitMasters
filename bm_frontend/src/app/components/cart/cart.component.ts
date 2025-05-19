import { Component, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from './cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, ModalComponent, CommonModule, LoginComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements AfterViewInit {
  showModal = false;
  showProducts = true;
  itemCount = 0;
  cartItems: CartItem[] = [];
  loginVisible = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    public cartService: CartService,
    private loginService: LoginService,
    private authService: AuthService // <- AÑADIDO
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.getUser() !== null;
  }

  ngAfterViewInit() {
    if (this.isLoggedIn) {
      setTimeout(() => this.loadItems());
    }
  }

  loadItems() {
    this.cartItems = this.cartService.getItems();
    this.itemCount = this.cartService.getTotalItems();
    this.showProducts = this.itemCount > 0;
    this.cdr.detectChanges();
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToShippingDetails() {
    this.router.navigate(['/direccion']);
  }

  onClose() {
    this.showModal = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  openModal() {
    this.showModal = true;
    this.renderer.addClass(document.body, 'modal-open');
  }

  vaciarCesta() {
    this.cartService.clearCart();
    this.loadItems();
    this.showModal = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  abrirLogin() {
    this.loginService.showLogin();
  }
}
