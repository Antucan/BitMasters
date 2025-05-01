import { Routes } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductoComponent } from './components/producto/producto.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductosComponent },
  { path: 'add-product', component: AddProductComponent}
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'admin', component: LoginComponent }
];
