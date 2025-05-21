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
import { UserService } from '../admin/user.service';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [UserService, LoginService]
})
export class ProfileComponent {
  user: User | null = null;
  review: Review | null = null;
  purchases: Purchase[] = [];
  products: Product[] = [];
  isLoggedIn: boolean = false; // Variable para verificar si es un usuario logeado
  //comandos para edición de perfil
  editName: boolean = false;
  editSurname: boolean = false;
  editMail: boolean = false;
  editPhone: boolean = false;
  loginVisible = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private ProfileService: ProfileService,
    private userService: UserService,
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
            this.isLoggedIn = false; // Cambia el estado a no logueado
            console.log(this.user); // Verifica el producto en la consola
          });
        } else {
          this.user = user; // Asigna el primer elemento del array
          this.isLoggedIn = true; // Cambia el estado a logueado
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
      this.loginService.loginVisible$.subscribe(visible => {
        this.loginVisible = visible;
      });
    })

  }
  /**
   * 
   * @param field Funciones para editar el perfil
   */
  toggleEdit(field: string): void {
    if (field === 'name') {
      this.editName = !this.editName;
      this.editSurname = !this.editSurname; // Desactiva la edición de apellido si se activa la edición de nombre
    }
    if (field === 'mail') this.editMail = !this.editMail;
    if (field === 'phone') this.editPhone = !this.editPhone;
  }

  updateField(field: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.user) {
      (this.user as any)[field] = inputElement.value;
    }
  }

  saveProfile(): void {
    if (this.user) {
      this.ProfileService.updateUser(this.user).subscribe({
        next: () => {
          alert('Perfil actualizado correctamente.');
          this.editName = false;
          this.editSurname = false;
          this.editMail = false;
          this.editPhone = false;
        },
        error: (err) => {
          console.error('Error al actualizar el perfil:', err);
          alert('Hubo un problema al guardar los cambios.');
        }
      });
    }
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

  hideLogin() {
    this.loginService.hideLogin();
  }
}
