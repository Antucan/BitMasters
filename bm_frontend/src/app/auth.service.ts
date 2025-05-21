import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/users/login';
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
          if (response.user.role !== 2) {
            throw new Error('Login failed: Unauthorized role');
          }
          const user = new User(
            response.user.id,
            response.user.name,
            response.user.surname,
            response.user.phone,
            response.user.mail,
            response.user.password,
            response.user.role
          );

          this.userSubject.next(user);
          console.log('User logged in:', user);
          return user;
        } else {
          throw new Error('Login failed');
        }
      })
    );
  }
  logout(): void {
    this.userSubject.next(null);

  }
  getUser(): User | null {
    return this.userSubject.value;
  }
  setUser(user: User): void {
    this.userSubject.next(user);
  }
}