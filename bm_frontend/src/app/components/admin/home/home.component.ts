import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { ClientsComponent } from "./clients/clients.component";
import { ProductsComponent } from "./products/products.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PurchaseService } from '../purchase.service';
import { PurchasesComponent } from './purchases/purchases.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ClientsComponent, ProductsComponent, PurchasesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  countClients: number = 0;
  countProducts: number = 0;
  countPurchases: number = 0;
  clientsComponent = false;
  productsComponent = false;
  purchaseComponent = false;

  constructor(private productService: ProductService, private userService: UserService, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    // Llama al método countClients del servicio y actualiza la propiedad countClients
    this.userService.countClients().subscribe(clients => {
      this.countClients = clients.length; // Asigna la cantidad de clientes
    });

    this.productService.countProducts().subscribe(products => {
      this.countProducts = products.length;
    });

    this.purchaseService.countPurchases().subscribe(purchases => {
      this.countPurchases = purchases.length;
    });
  }

  showDashboard() {
    this.clientsComponent = false;
    this.productsComponent = false;
    this.purchaseComponent = false;
  }

  showClients() {
    this.clientsComponent = true;
    this.productsComponent = false;
  }

  showProducts() {
    this.clientsComponent = false;
    this.productsComponent = true;
  }

  showPurchases() {
    this.clientsComponent = false;
    this.productsComponent = false;
    this.purchaseComponent = true;
  }
}


