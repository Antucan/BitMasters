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
  name: string = '';
  password: string = '';
  loginVisible: boolean = false;
  
  constructor(private http: HttpClient, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  updateName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.name = inputElement.value;
  }

  updatePass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }

  login(): void {
    console.log('Attempting login with name:', this.name, 'and password:', this.password);
    //llamar a la funcion login de auth.service.ts
    this.authService.login({ name: this.name, password: this.password }).subscribe(
      response => {
        console.log('Login successful:', response);
        // Aquí puedes manejar la respuesta del servidor después de un inicio de sesión exitoso
      },
      error => {
        console.error('Login failed:', error);
        // Aquí puedes manejar el error de inicio de sesión
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