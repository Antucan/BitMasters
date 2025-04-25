import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://127.0.0.1:8000/productos';
  private apiUrlById = 'http://127.0.0.1:8000/productos/id';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrlById, {
      params: { id: id.toString() }
    });
  }
}