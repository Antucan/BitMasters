import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loginVisible = false;

  constructor(private loginService: LoginComponent) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }
}
