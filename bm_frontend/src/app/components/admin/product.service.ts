import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/productos'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-products`);
  }

  // Obtener la cantidad de productos
  countProducts(): Observable<any[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.id !== null)) // Filtra los productos que tienen ID
    );
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, product);
  }

  // Actualizar un producto existente
  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${product.id}`, product,{
      headers: { 'Content-Type': 'application/json' }
  });
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}