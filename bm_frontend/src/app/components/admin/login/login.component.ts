import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule, HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logged: boolean = false;
  mail: string = '';
  password: string = '';
  errorMessage: string | null = null;
  mailErrorMessage: string | null = null;
  passwordErrorMessage: string | null = null;
  roleErrorMessage: string | null = null;
  router: any;

  constructor(private http: HttpClient, private loginService: LoginService, private authService: AuthService) { }

  updateMail(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.mail = inputElement.value;
  }

  updatePass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }

  login(): void {
    // Reseteamos mensajes de error
    this.mailErrorMessage = null;
    this.passwordErrorMessage = null;
    this.roleErrorMessage = null;
    console.log('Attempting login with mail:', this.mail, 'and password:', this.password);
    //llamar a la funcion login de auth.service.ts
    this.authService.login({ mail: this.mail, password: this.password }).subscribe(
      response => {
        console.log('Login successful:', response);
        this.logged = true; // Cambiamos el estado de logged a true
        // Si el login es exitoso, cargar el componente home y cerra el login
        this.mailErrorMessage = null;
        this.passwordErrorMessage = null;
        this.roleErrorMessage = null;
      },
      error => {
        console.error('Login failed:', error);
        if (error.status === 400) {
          this.passwordErrorMessage = "Introduce la Contraseña";
        }
        if (error.status === 401) {
          this.passwordErrorMessage = "Constraseña incorrecta";
        } else if (error.status === 404) {
          this.mailErrorMessage = "Usuario no encontrado";
        } else if (error.message === 'Login failed: Unauthorized role') {
          this.roleErrorMessage = "Usuario no autorizado";
        }
      }
    );
  }

  closeLogin(): void {
    this.loginService.hideAdminLogin();
  }
}
