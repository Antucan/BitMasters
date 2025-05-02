import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { ClientsComponent } from "./clients/clients.component";
import { ProductsComponent } from "./products/products.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ClientsComponent, ProductsComponent, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  countClients: number = 0;
  countProducts: number = 0;
  clientsComponent = false;
  productsComponent = false;

  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    // Llama al método countClients del servicio y actualiza la propiedad countClients
    this.userService.countClients().subscribe(clients => {
      this.countClients = clients.length; // Asigna la cantidad de clientes
    });
    // Llama al método countProducts del servicio y actualiza la propiedad countProducts
    this.productService.countProducts().subscribe(products => {
      this.countProducts = products.length; // Asigna la cantidad de productos
    });

  }

  showDashboard() {
    this.clientsComponent = false;
    this.productsComponent = false;
  }

  showClients() {
    this.clientsComponent = true;
    this.productsComponent = false;
  }

  showProducts() {
    this.clientsComponent = false;
    this.productsComponent = true;
  }
}


