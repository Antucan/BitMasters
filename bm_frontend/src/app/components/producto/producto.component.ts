import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos/productos.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service'; // ✅ Asegúrate de que la ruta sea correcta
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, LoginComponent, HttpClientModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  product: Product | null = null;
  loginVisible = false;
  successMessage = false;


  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cartService: CartService, // ✅ Inyectamos el servicio
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoById(id).subscribe((response) => {
      this.product = response[0];
      console.log("Productos: ",this.product); 
      console.log("Nombre del usuario del producto: ", this.product?.user); 
      console.log("ID del usuario del producto: ", id);
    });
  }


  addToCart(): void {
    const currentUser = this.authService.getUser();

    if (!currentUser) {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      return;
    }

    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        img_url: this.product.img_url,
        quantity: 1
      });

      this.successMessage = true;

      setTimeout(() => {
        this.successMessage = false;
      }, 3000);
    }



  }

  navigateToProfile() {
    this.router.navigate(['/profile/' + this.product?.user.id]);
  }

}