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
import { UserService } from '../admin/user.service'; // Asegúrate de que la ruta sea correcta

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
      private userService: UserService // Inyecta el servicio UserService
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
    });

    this.ProfileService.getProducts(id).subscribe((response) => {
      this.products = response;
     
    });
  }

  navigateToAddProduct() {
    this.router.navigate(["/add-product"]);
  }

  deleteProfile(userId: number | undefined): void {
    if (!userId) {
      console.error('El ID del usuario no está definido.');
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('Usuario eliminado con éxito:', response);
        // Redirige o realiza alguna acción adicional después de eliminar
        // this.router.navigate(['/']); // Por ejemplo, redirige a la página principal
      },
      error: (err) => {
        console.error('Error al eliminar el usuario:', err);
      }
    });
  }
}
