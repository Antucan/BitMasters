import { Component } from '@angular/core';
import { CreateProduct } from './add-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, LoginComponent, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [CreateProduct]
})
export class AddProductComponent {
  loginVisible = false;
  constructor(
    private product: CreateProduct,
    private loginService: LoginService
  ){
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  name: string = '';
  description: string = '';
  category: string = '';
  price: number = 0;
  image: string = '';
  

  validateName(){
    if(this.name === ""){
      return false;
    }
    
    return true;
  }

  validatePrice(){
    if(this.price <= 0){
      return false;
    }

    return true;
  }

  validateCategory(){
    if(this.category === ''){
      return false;
    }

    return true;
  }

  add(): void{
    console.log(this.name, this.image, this.category, this.price);
    console.log(this.image)
    if (this.validateName() && this.validateCategory() && this.validatePrice()) { 
      this.product.postProduct(this.name, this.description, this.category, this.price, this.image).subscribe(
        (algo) => {
          console.log(algo);
          console.log(this.name);
        }
      )
    }else{
      alert("Faltan campos");
    }
  }

}
