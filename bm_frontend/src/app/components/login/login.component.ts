import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule]
})

export class LoginComponent {
  mail: string = '';
  password: string = '';
  loginVisible: boolean = false;
  errorMessage: string | null = null;
  mailErrorMessage: string | null = null;
  passwordErrorMessage: string | null = null;

  constructor(private http: HttpClient, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  updateMail(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.mail = inputElement.value;
  }

  updatePass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }

  login(): void {
    console.log('Attempting login with mail:', this.mail, 'and password:', this.password);
    //llamar a la funcion login de auth.service.ts
    this.authService.login({ mail: this.mail, password: this.password }).subscribe(
      response => {
        console.log('Login successful:', response);
        this.loginVisible = false; // Ocultar el formulario de inicio de sesión después de un inicio de sesión exitoso
        // Aquí puedes manejar la respuesta del servidor después de un inicio de sesión exitoso
        this.mailErrorMessage = null;
        this.passwordErrorMessage = null;
      },
      error => {
        console.error('Login failed:', error);
        // Reseteamos mensajes de error
        this.mailErrorMessage = null;
        this.passwordErrorMessage = null;
        // Aquí puedes manejar el error de inicio de sesión
        if (error.error && error.error.message) {
          if (error.error.message.includes('mail')) {
            this.mailErrorMessage = "Correo incorrecto";
          }
          if (error.error.message.includes('password')) {
            this.passwordErrorMessage = "Contraseña incorrecta";
          }
        } else {
          this.errorMessage = "Error de conexión";
        }
      }
    );
  }

  showLogin() {
    this.loginService.showLogin();
  }

  hideLogin() {
    this.loginService.hideLogin();
  }
}