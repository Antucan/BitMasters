import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/users/login'; // Reemplaza con tu URL de Symfony

  constructor(private http: HttpClient) { }

  login(credentials: { mail: string, password: string }): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log('Sending login request to:', this.apiUrl, 'with credentials:', credentials);
    return this.http.post<any>(this.apiUrl, credentials, { headers });
  }
}