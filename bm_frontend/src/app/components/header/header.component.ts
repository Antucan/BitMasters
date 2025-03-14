import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private LoginComponent: LoginComponent) {}

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  showLogin() {
    this.LoginComponent.showLogin();
  }
}