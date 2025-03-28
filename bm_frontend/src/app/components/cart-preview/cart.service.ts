import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();

  showCart() {
    this.cartVisible.next(true);
  }

  hideCart() {
    this.cartVisible.next(false);
  }

  toggleCart() {
    this.cartVisible.next(!this.cartVisible.getValue());
  }
}
