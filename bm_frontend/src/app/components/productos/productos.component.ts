import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from './productos.service'; // Importa el nuevo servicio
import { Product } from '../../models/product.model'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router para la navegación
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LoginComponent], // Elimina Router de aquí
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // Inicializa filteredProducts
  currentPage = 1;
  itemsPerPage = 8;
  loginVisible = false;
  priceMin: number | null = null;
  priceMax: number | null = null;
  allCategories: string[] = [
    'consolas',
    'juegos',
    'accesorios',
    'perifericos',
    'merchandising',
    'hardware',
    'coleccionismo'
  ];
  selectedCategory: string | null = null;
  selectedCategories: string[] = [];

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  onCategoryChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (input.checked) {
      this.selectedCategories.push(value);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== value);
    }

    this.applyFilters();
  }

  onSingleCheckboxChange(category: string) {
    if (this.selectedCategory === category) {
      // Si se hace clic sobre el que ya está seleccionado, se deselecciona
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }

    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const meetsMin = this.priceMin === null || product.price >= this.priceMin;
      const meetsMax = this.priceMax === null || product.price <= this.priceMax;

      const inSelectedCategory = !this.selectedCategory || product.category === this.selectedCategory;

      return meetsMin && meetsMax && inSelectedCategory;
    });

    this.currentPage = 1;
  }

  onPriceMinChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.priceMin = input.value ? parseFloat(input.value) : null;
  }

  onPriceMaxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.priceMax = input.value ? parseFloat(input.value) : null;
  }

  filterByPrice() {
    this.filteredProducts = this.products.filter(product => {
      const meetsMin = this.priceMin === null || product.price >= this.priceMin;
      const meetsMax = this.priceMax === null || product.price <= this.priceMax;
      return meetsMin && meetsMax;
    });
    this.currentPage = 1; // Reinicia la paginación al aplicar un filtro
  }

  loadProducts() {
    this.productosService.getProductos().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data; // Inicializa filteredProducts con todos los productos
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

  getPaginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.filteredProducts.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}