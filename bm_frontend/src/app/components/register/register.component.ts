import { Component } from '@angular/core';
import { CreateUser } from './register.service';

@Component({
  selector: 'register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [CreateUser]
})
export class RegisterComponent {

  constructor(private user: CreateUser){}
  email: string = '';
  name: string = '';
  pass: string = '';
  Rpass: string = '';

  updateEmail(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.email = inputElement.value;
  }

  updateName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.name = inputElement.value;
  }

  updatePass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.pass = inputElement.value;
  }

  updateRpass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.Rpass = inputElement.value;
  }

  notEmpty(): boolean {
    if (this.email === '' || this.name === '' || this.pass === '' || this.Rpass === '') {
      alert('Asegurate de no dejar campos vacios');
      return false;
    } else {
      return true;
    }
  }

  checkPass(): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.pass)) {
      alert('La contraseña debe tener minimo 8 caracteres, una letra mayuscula y un numero');
      return false;
    } else {
      return true;
    }
  }

  checkRpass(): boolean {
    if (this.pass !== this.Rpass) {
      alert('La confirmacion de contraseña no es correcta');
      return false;
    } else {
      return true;
    }
  }

  send(): void {
    if (this.notEmpty() && this.checkPass() && this.checkRpass()) {
      console.log('register:', this.email, this.name, this.pass, this.Rpass);
      
      this.user.postUsers(this.name, this.pass, this.email).subscribe(
        (algo) => {
          console.log(algo);
          console.log(this.name);
        }
      )
    }
  }
}
