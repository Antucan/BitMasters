import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-preview',
  imports: [],
  standalone: true,
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.css'
})
export class CartPreviewComponent {

  @Output() close = new EventEmitter<void>();

  closeCart() {
    this.close.emit();
  }
}
