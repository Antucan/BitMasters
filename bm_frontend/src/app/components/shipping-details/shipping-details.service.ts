import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root'
})

export class ShippingDetailsService {
  constructor(private http: HttpClient, private conexHttp: HttpClient) { }

  getUserAddress(id: number): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/addresses/get/' + id);
  }

  createAddress(street_type: String, name: String, zip_code: string, city: string, user_id: number): Observable<any> {
    let address = {
      "street_type": street_type,
      "name": name,
      "zip_code": zip_code,
      "city": city,
      "user_id": user_id,
    };
    let url = "http://127.0.0.1:8000/addresses/new";
    return this.conexHttp.post(url, address, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  DeleteAddress(id: number): Observable<any> {
    return this.http.delete<any>('http://127.0.0.1:8000/addresses/' + id)
  }
}