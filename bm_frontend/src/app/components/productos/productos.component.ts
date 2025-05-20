import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from './productos.service'; 
import { Product } from '../../models/product.model';
import { Router } from '@angular/router'; 
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LoginComponent], 
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; 
  currentPage = 1;
  itemsPerPage = 8;
  loginVisible = false;
  priceMin: number | null = null;
  priceMax: number | null = null;
  priceRangeError = false;
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
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }

    this.applyFilters(); 
  }

 validateAndApplyFilters() {
  if (
    this.priceMin !== null &&
    this.priceMax !== null &&
    this.priceMin > this.priceMax
  ) {
    this.priceRangeError = true;
    setTimeout(() => {
      this.priceRangeError = false;
    }, 5000);

    return;
  }

  this.priceRangeError = false;
  this.applyFilters();
}


  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const meetsMin = this.priceMin === null || product.price >= this.priceMin;
      const meetsMax = this.priceMax === null || product.price <= this.priceMax;
      const inSelectedCategory =
        !this.selectedCategory || product.category === this.selectedCategory;

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
    this.currentPage = 1; 
  }

  loadProducts() {
    this.productosService.getProductos().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data; 
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
