import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink, RouterLinkActive, RouterOutlet]
})
export class LoginComponent {
  name: string = '';
  pass: string = '';

  

  updateName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.name = inputElement.value;
  }

  updatePass(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.pass = inputElement.value;
  }

  showData(): void {
    console.log('Login:', this.name, this.pass);

  }
}