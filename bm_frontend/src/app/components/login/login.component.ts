import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule]
})

@Injectable({
  providedIn: 'root'
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

  send(): void {
    console.log('Login:', this.name, this.pass);
  }

  private loginVisible = new BehaviorSubject<boolean>(false);
  loginVisible$ = this.loginVisible.asObservable();

  showLogin() {
    this.loginVisible.next(true);
  }

  hideLogin() {
    this.loginVisible.next(false);
  }
}