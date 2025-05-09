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
    return this.http.get<any>('http://127.0.0.1:8000/users/'+id);
  }

  getPurchaseHistory(id: number): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/purchases/get/'+id);
  }

  getProducts(id: number): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/productos/user/'+id);
    
  }
}