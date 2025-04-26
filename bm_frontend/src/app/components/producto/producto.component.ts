import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos/productos.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
  
  ) {}

  ngOnInit(): void {
    // Obtén el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Llama al servicio para obtener el producto por ID
    this.productosService.getProductoById(id).subscribe((response) => {
      this.product = response[0]; // Asigna el primer elemento del array
      console.log(this.product); // Verifica el producto en la consola
    });
  }
}