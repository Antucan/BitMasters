import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  name: string = '';
  price: number = 0;
  description: string = '';
  img: string = '';
}
