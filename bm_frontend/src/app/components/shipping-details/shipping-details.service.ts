import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root'
})

export class ShippingDetailsService {
  constructor(private http: HttpClient) { }

  getUserAddress(id: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/addresses/get/' + id);
  }

  DeleteAddress(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/addresses/' + id)
  }
}