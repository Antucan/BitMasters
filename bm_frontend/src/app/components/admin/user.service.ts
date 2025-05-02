import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://127.0.0.1:8000/users'; // Cambia la URL según tu backend

    constructor(private http: HttpClient) { }

    // Obtener todos los usuarios
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}`);
    }

    getClients(): Observable<any[]> {
        return this.getUsers().pipe(
            map(users => users.filter(user => user.role === 2))
        );
    }

    // Obtener la cantidad de usuarios con role 2
    countClients(): Observable<any[]> {
        return this.getUsers().pipe(
            map(users => users.filter(user => user.role === 2))
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