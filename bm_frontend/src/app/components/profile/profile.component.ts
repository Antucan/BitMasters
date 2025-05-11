import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review.model';
import { Purchase } from '../../models/purchase.model';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { UserService } from '../admin/user.service'; // Importa el servicio aquí

@Component({
  selector: 'app-profile',
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule], // Importa los módulos necesarios
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [UserService] // Registra el servicio aquí si no está en el nivel raíz
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
    private userService: UserService // Inyecta el servicio aquí
  ) { }

  ngOnInit(): void {
    // Obtén el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Llama al servicio para obtener el producto por ID
    this.ProfileService.getUserById(id).subscribe((response) => {
      this.user = response[0]; // Asigna el primer elemento del array
      console.log(this.user); // Verifica el producto en la consola
    });

    this.ProfileService.getPurchaseHistory(id).subscribe((response) => {
      this.purchases = response;
      console.log(this.purchases);
    });

    this.ProfileService.getProducts(id).subscribe((response) => {
      this.products = response;
      console.log(this.products);
    });
  }

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  deleteProfile(userId: number | undefined): void {
    if (userId === undefined) {
      console.error('El ID del usuario no está definido.');
      return; // Salir de la función si el ID es undefined
    }
  
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        alert('Usuario eliminado correctamente');
        // Redirigir a la página de inicio o a otra página después de eliminar el usuario
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }
}
