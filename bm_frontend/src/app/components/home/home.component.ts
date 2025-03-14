import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent],
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
