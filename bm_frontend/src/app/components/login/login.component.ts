import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

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
  

constructor(private http: HttpClient, private loginService: LoginService) { }

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
    const loginData = { name: this.name, password: this.password };
    this.http.post('/users/login', loginData, { headers: { 'Content-Type': 'application/json' } }).subscribe(response => {
      console.log('Login successful', response);
    }, error => {
      console.error('Login failed', error);
    });
  }

  showLogin() {
    this.loginService.showLogin();
  }

  hideLogin() {
    this.loginService.hideLogin();
  }
}