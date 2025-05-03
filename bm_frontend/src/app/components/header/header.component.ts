import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { AuthService } from '../../auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged: boolean = false;
  userName: string = '';

  constructor(private router: Router,
    private cartService: CartService,
    private loginService: LoginService,
    private authService: AuthService,) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      console.log('User object: ',user);
      if (user) {
        this.logged = !!user; // Cambia a true si hay un usuario, false si no
        this.userName = user.name || 'PERFIL'; 
        console.log('User detected in HeaderComponent: ', this.userName);
      }
    });
  }

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  showLogin() {
    this.loginService.showLogin();
  }

  onCartClick() {
    this.cartService.showCart(); 
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

}