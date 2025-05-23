import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class purhcaseService {
    private apiUrl = 'http://127.0.0.1:8000/purchases'; // Cambia la URL según tu backend

    constructor(private http: HttpClient) { }

    // Obtener todos los usuarios
    getPurchases(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}`);
    }

    // Obtener la cantidad de usuarios con role 2
    countPurchases(): Observable<any[]> {
        return this.getPurchases().pipe(
            map(purchases => purchases.filter(purchase => purchase.id !== null)) // Filtra los productos que tienen ID
        );
    }

    // Obtener un usuario por ID
    getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    // Actualizar un usuario existente
    updateUser(client: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${client.id}`, client, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Eliminar un usuario
    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}/delete`);
    }
}