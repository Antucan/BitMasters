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
    private userService: UserService, // Inyecta el servicio aquí
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUser()
    this.route.params.subscribe((params) => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      // Llama al servicio para obtener el producto por ID
      this.authService.user$.subscribe((user) => {
        if (user?.id !== id) {
          this.ProfileService.getUserById(id).subscribe((response) => {
            this.user = response[0]; // Asigna el primer elemento del array
            console.log(this.user); // Verifica el producto en la consola
          });
        } else {
          this.user = user; // Asigna el primer elemento del array
          console.log(this.user); // Verifica el producto en la consola
        }
      });

      this.ProfileService.getPurchaseHistory(id).subscribe((response) => {
        this.purchases = response;
        console.log(this.purchases);
      });

      this.ProfileService.getProducts(id).subscribe((response) => {
        this.products = response;
        console.log(this.products);
      });
    })

  }
  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  deleteProduct(productId: number): void {
    this.ProfileService.deleteProduct(productId).subscribe({
      next: () => {
        alert('El producto ha sido eliminado correctamente.');

        this.products = this.products.filter(product => product.id !== productId);
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        alert('Hubo un error al intentar eliminar el producto.');
      }
    });
  }

  deleteProfile(userId: number | undefined): void {
    if (userId === undefined) {
      console.error('El ID del usuario no está definido.');
      return; 
    }

 
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.');

    if (!confirmDelete) {
    
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        alert('Usuario eliminado correctamente');
        this.authService.logout();

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }
}
