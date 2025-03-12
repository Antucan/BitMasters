import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, HeaderComponent, RegisterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bm_frontend';
}
