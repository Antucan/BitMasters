import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/users/' + id);
  }

  getPurchaseHistory(id: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/purchases/get/' + id);
  }

  getProducts(id: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/productos/user/' + id);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/productos/delete/' + id);
  }

  // Actualizar un usuario existente
  updateUser(client: any): Observable<any> {
    return this.http.put<any>(`http://127.0.0.1:8000/users/${client.id}`, client, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

}