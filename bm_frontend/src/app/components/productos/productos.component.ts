import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from './productos.service'; // Importa el nuevo servicio
import { Product } from '../../models/product.model'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router para la navegación
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Elimina Router de aquí
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: Product[] = [];
  currentPage = 1;
  itemsPerPage = 8;

  constructor(
    private productosService: ProductosService,
    private router: Router,
  ) {}
  

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productosService.getProductos().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  goToProduct(productId: number) {
    this.router.navigate(['/producto', productId]);
  }

  get paginatedProducts(): Product[] {
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