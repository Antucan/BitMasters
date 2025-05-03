import { Routes } from '@angular/router';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CartComponent } from './components/cart/cart.component';
import { ShippingDetailsComponent } from './components/shipping-details/shipping-details.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'products', component: ProductosComponent },
  { path: 'add-product', component: AddProductComponent},
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'cesta', component: CartComponent },
  { path: 'direccion', component: ShippingDetailsComponent},
  { path: 'pago', component: PaymentComponent}

];
