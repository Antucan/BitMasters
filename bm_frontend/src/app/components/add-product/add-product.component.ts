import { Component } from '@angular/core';
import { CreateProduct } from './add-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../auth.service';

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

  constructor(
    private product: CreateProduct,
    private loginService: LoginService,
    private authService: AuthService // Inyectamos AuthService
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user.id; // Asignamos el ID del usuario
        console.log('User detected in AddProductComponent: ', this.user_id);
      }
    });
  }

  validateName() {
    if (this.name === "") {
      return false;
    }

    return true;
  }

  validatePrice() {
    if (this.price <= 0) {
      return false;
    }

    return true;
  }

  validateCategory() {
    if (this.category === '') {
      return false;
    }

    return true;
  }

  add(): void {
    if (this.validateName() && this.validateCategory() && this.validatePrice()) {
      this.product.postProduct(this.user_id, this.name, this.description, this.category, this.price, this.image).subscribe(
        (algo) => {
          console.log(algo);
          console.log(this.name);
        }
      )
    } else {
      alert("Faltan campos");
    }
  }

}
