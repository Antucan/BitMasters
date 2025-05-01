import { Component } from '@angular/core';
import { CreateProduct } from './add-product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [CreateProduct]
})
export class AddProductComponent {
  constructor(private product: CreateProduct){}
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
