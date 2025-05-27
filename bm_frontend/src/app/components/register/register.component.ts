import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateUser } from './register.service';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'register',
  standalone: true,
  imports: [LoginComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [CreateUser]
})
export class RegisterComponent {
  email: string = '';
  name: string = '';
  surname: string = '';
  pass: string = '';
  Rpass: string = '';
  loginVisible = false;

  constructor(
    private user: CreateUser,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  updateEmail(event: Event): void {
    this.email = (event.target as HTMLInputElement).value;
  }

  updateName(event: Event): void {
    this.name = (event.target as HTMLInputElement).value;
  }

  updateSurname(event: Event): void {
    this.surname = (event.target as HTMLInputElement).value;
  }

  updatePass(event: Event): void {
    this.pass = (event.target as HTMLInputElement).value;
  }

  updateRpass(event: Event): void {
    this.Rpass = (event.target as HTMLInputElement).value;
  }

  notEmpty(): boolean {
    if (!this.email || !this.name || !this.pass || !this.Rpass) {
      alert('Asegúrate de no dejar campos vacíos');
      return false;
    }
    return true;
  }

  checkPass(): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.pass)) {
      alert('La contraseña debe tener mínimo 8 caracteres, una letra mayúscula y un número');
      return false;
    }
    return true;
  }

  checkRpass(): boolean {
    if (this.pass !== this.Rpass) {
      alert('La confirmación de contraseña no es correcta');
      return false;
    }
    return true;
  }

  send(): void {
    if (this.notEmpty() && this.checkPass() && this.checkRpass()) {
      console.log('register:', this.email, this.name, this.surname, this.pass, this.Rpass);

      this.user.postUsers(this.name, this.surname, this.pass, this.email).subscribe(
        (response) => {
          console.log(response);
          alert('Registro exitoso');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 409) {
            alert('Ya existe un usuario con ese correo electrónico');
          } else {
            alert('Ha ocurrido un error en el registro');
          }
        }
      );
    }
  }
}
