import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos/productos.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service'; // ✅ Asegúrate de que la ruta sea correcta
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  product: Product | null = null;
  loginVisible = false;
  

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cartService: CartService, // ✅ Inyectamos el servicio
    private loginService: LoginService
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoById(id).subscribe((response) => {
      this.product = response[0];
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        img_url: this.product.img_url,
        quantity: 1
      });
    }
  }
}
