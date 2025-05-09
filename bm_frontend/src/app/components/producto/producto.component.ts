import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos/productos.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service'; // ✅ Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cartService: CartService // ✅ Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoById(id).subscribe((response) => {
      this.product = response[0];
      console.log(this.product); // Verifica el producto en la consola
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

  // navigateToProfile(){
  //   const userId = this.product?.user; // Cambia esto según cómo obtengas el user_id
  //   if (userId) {
  //     this.route.navigate(['/profile/' + userId]);
  //   }
  // }
}
