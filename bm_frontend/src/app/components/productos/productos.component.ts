import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  products = [
    { img: '/assets/images/bitmasters5.jpg', price: 5.99, name: 'Producto 1', description: 'Descripción del producto 1' },
    { img: '/assets/images/bitmasters5.jpg', price: 6.99, name: 'Producto 2', description: 'Descripción del producto 2' },
    { img: '/assets/images/bitmasters5.jpg', price: 7.99, name: 'Producto 3', description: 'Descripción del producto 3' },
    { img: '/assets/images/bitmasters5.jpg', price: 8.99, name: 'Producto 4', description: 'Descripción del producto 4' },
    { img: '/assets/images/bitmasters5.jpg', price: 9.99, name: 'Producto 5', description: 'Descripción del producto 5' },
    { img: '/assets/images/bitmasters5.jpg', price: 10.99, name: 'Producto 6', description: 'Descripción del producto 6' },
    { img: '/assets/images/bitmasters5.jpg', price: 11.99, name: 'Producto 7', description: 'Descripción del producto 7' },
    { img: '/assets/images/bitmasters5.jpg', price: 12.99, name: 'Producto 8', description: 'Descripción del producto 8' },
    { img: '/assets/images/bitmasters5.jpg', price: 13.99, name: 'Producto 9', description: 'Descripción del producto 9' },
    { img: '/assets/images/bitmasters5.jpg', price: 14.99, name: 'Producto 10', description: 'Descripción del producto 10' }
  ];
  currentPage = 1;
  itemsPerPage = 8;

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.products.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}