import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  loginSuccessMessage: string | null = null;
  errorMessage: string | null = null;
  mailErrorMessage: string | null = null;
  passwordErrorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

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
    this.errorMessage = null;
    this.loginSuccessMessage = null;

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
        this.loginSuccessMessage = "Inicio de sesión exitoso";
        setTimeout(() => {
          this.loginSuccessMessage = null;
          this.loginService.hideLogin();
        }, 3000);
      },
      error => {
        if (error.status === 401) {
          this.passwordErrorMessage = "Contraseña incorrecta";
        } else if (error.status === 404) {
          this.mailErrorMessage = "Usuario no encontrado";
        } else if (error.message === "Login failed: Unauthorized role") {
          this.errorMessage = "Usuario no autorizado";
        } else {
          this.errorMessage = "Error al iniciar sesión";
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
