import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review.model';
import { Purchase } from '../../models/purchase.model';
import { Product } from '../../models/product.model';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null;
  review: Review | null = null;
  purchases: Purchase[] = [];
  products: Product[] = [];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private ProfileService: ProfileService,
    ) {}

  ngOnInit(): void {
    // Obtén el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Llama al servicio para obtener el producto por ID
    this.ProfileService.getProductoById(id).subscribe((response) => {
      this.user = response[0]; // Asigna el primer elemento del array
      console.log(this.user); // Verifica el producto en la consola
    });

    this.ProfileService.getPurchaseHistory(id).subscribe((response) => {
      this.purchases = response;
      console.log(this.purchases);
    })

    this.ProfileService.getProducts(id).subscribe((response) => {
      this.products = response;
      console.log(this.products);
    })

  }

  navigateToAddProduct(){
    this.router.navigate(["/add-product"]);
  }
  
}
