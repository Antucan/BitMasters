import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://127.0.0.1:8000/productos'; 

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    console.log("service");
    return this.http.get<any>(this.apiUrl);
  }
}