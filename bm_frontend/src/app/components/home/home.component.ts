import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { ProductosService } from '../productos/productos.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../productos/productos.component.css']
})
export class HomeComponent implements OnInit {
  loginVisible = false;
  paginatedProducts: Product[] = []; // Variable para almacenar los 4 primeros productos

  constructor(
    private loginService: LoginService,
    private router: Router,
    private productosService: ProductosService
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  ngOnInit(): void {
    this.loadProducts(); // Llama al método para cargar los productos
  }

  loadProducts(): void {
    this.productosService.getProductos().subscribe((data: Product[]) => {
      console.log('Productos:', data); // Muestra los productos en la consola
      this.paginatedProducts = data.slice(0, 4); // Obtén los primeros 4 productos
    });
  }
}