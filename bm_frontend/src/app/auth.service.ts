import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model'; // Update the path to the User model
import { map, tap } from 'rxjs';//para actualizar la propiedad user

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/users/login'; // Reemplaza con tu URL de Symfony
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  //Observable para exponer los datos del usuario
  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  login(credentials: { mail: string, password: string }): Observable<User> {
    const headers = { 'Content-Type': 'application/json' };
    console.log('Sending login request to:', this.apiUrl, 'with credentials:', credentials);

    return this.http.post<{ success: boolean; user: any }>(this.apiUrl, credentials, { headers }).pipe(
      map(response => {
        if (response.success) {
          const user = new User(
            response.user.id,
            response.user.name,
            response.user.surname,
            response.user.phone,
            response.user.mail,
            response.user.password,
            response.user.role
          ); // Mapea los datos al modelo User
          this.userSubject.next(user); // Actualiza el BehaviorSubject con el nuevo usuario
          console.log('User logged in:', user);
          return user;
        } else {
          throw new Error('Login failed');
        }
      })
    );
  }
  logout(): void {
    this.userSubject.next(null); // Limpiar el usuario al cerrar sesión
  }
  getUser(): User | null {
    return this.userSubject.value; // Obtener el valor actual del BehaviorSubject
  }
  setUser(user: User): void {
    this.userSubject.next(user); // Actualiza el BehaviorSubject con el nuevo usuario
  }
}