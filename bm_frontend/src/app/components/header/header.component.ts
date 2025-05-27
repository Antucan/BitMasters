import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { AuthService } from '../../auth.service';
import { CatalogComponent } from '../catalog/catalog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BannerComponent, CatalogComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  userName: string = '';
  Id: number = 0;
  showCatalog = false;


  constructor(
    private router: Router,
    private cartService: CartService,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.logged = !!user; // Cambia a true si hay un usuario, false si no
        this.userName = user.name.toUpperCase() || 'PERFIL'; 
        this.Id = user.id
        console.log('User detected in HeaderComponent: ', this.userName);
  }});
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
    this.router.navigate(['/profile/'+this.Id]);

  }

  openCatalog() {
    this.showCatalog = true;
    document.body.style.overflow = 'hidden'; 
  }
  
  closeCatalog() {
    this.showCatalog = false;
    document.body.style.overflow = ''; 
  }
  
  logout(){
    this.authService.logout();
    this.logged = false;
    this.userName = '';
    this.router.navigate(['/']);
    alert('User logged out');
  }

}
