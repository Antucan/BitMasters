import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, empty } from 'rxjs';
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

  constructor(private http: HttpClient, private loginService: LoginService, private authService: AuthService, private router: Router) { }

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
    this.mailErrorMessage = null;
    this.passwordErrorMessage = null;

    if (!this.mail || this.mail.trim() === '') {
      this.mailErrorMessage = "El correo es obligatorio";
    }

    if (!this.password || this.password.trim() === '') {
      this.passwordErrorMessage = "La contraseña es obligatoria";
    }

    if (this.mailErrorMessage || this.passwordErrorMessage) {
      return;
    }

    this.authService.login({ mail: this.mail, password: this.password }).subscribe(
      response => {
        console.log('Login exitoso');
        this.loginService.hideLogin();
      },
      error => {
        if (error.status === 401) {
          this.passwordErrorMessage = "Contraseña incorrecta";
        } else if (error.status === 404) {
          this.mailErrorMessage = "Usuario no encontrado";
        } else if (error.message === "Login failed: Unauthorized role") {
          this.errorMessage = "Usuario no autorizado";
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

  goToRegister(): void {
    this.hideLogin();
    this.router.navigate(['/register']);
  }
}