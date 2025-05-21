import { Component } from '@angular/core';
import { CreateProduct } from './add-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, LoginComponent, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [CreateProduct]
})
export class AddProductComponent {
  loginVisible = false;
  name: string = '';
  description: string = '';
  category: string = '';
  price: number = 0;
  image: string = '';
  user_id: number = 0;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private product: CreateProduct,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user.id;
        console.log('User detected in AddProductComponent: ', this.user_id);
      }
    });
  }

  validateName(): boolean {
    return this.name.trim() !== '';
  }

  validatePrice(): boolean {
    return this.price > 0;
  }

  validateCategory(): boolean {
    return this.category.trim() !== '';
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 5000);
  }

  add(): void {
    if (this.validateName() && this.validateCategory() && this.validatePrice()) {
      this.product.postProduct(
        this.user_id,
        this.name,
        this.description,
        this.category,
        this.price,
        this.image
      ).subscribe(
        (response) => {
          console.log(response);
          this.showMessage("Producto añadido correctamente!", 'success');
          setTimeout(() => {
            this.router.navigate([`/profile/${this.user_id}`]);
          }, 3000);
        },
        (error) => {
          console.error("Error al añadir el producto: ", error);
          this.showMessage("Hubo un error al añadir el producto", 'error');
        }
      );
    } else {
      this.showMessage("Faltan campos por rellenar", 'error');
    }
  }
}
