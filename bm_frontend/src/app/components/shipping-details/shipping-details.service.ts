import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingDetailsService {
  private apiUrl = 'http://127.0.0.1:8000/addresses';

  constructor(private http: HttpClient) { }

  getUserAddress(id: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/get/${id}`, {
      withCredentials: true
    });
  }

  addAddress(userId: number, address: any): Observable<Address> {
    return this.http.post<Address>(
      this.apiUrl,
      { user_id: userId, ...address }
    );
  }

  deleteAddress(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }
  updateAddress(id: number, address: any): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, address);
  }

}
