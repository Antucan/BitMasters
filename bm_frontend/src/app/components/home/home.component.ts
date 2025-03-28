import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginVisible = false;

  constructor(private loginService: LoginService) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }
}
