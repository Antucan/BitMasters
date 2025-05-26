import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';
import { ShippingDetailsService } from './shipping-details.service';
import { AuthService } from '../../auth.service';
import { Address } from '../../models/address.model';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-shipping-details',
  imports: [MatDialogModule, CommonModule, LoginComponent],
  standalone: true,
  templateUrl: './shipping-details.component.html',
  styleUrl: './shipping-details.component.css'

})
export class ShippingDetailsComponent implements OnInit {
  addresses: any[] = [];
  user_id: number = 0;
  address: Address[] = [];
  loginVisible = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private shippingDetailsService: ShippingDetailsService,
    private authService: AuthService) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  ngOnInit(): void {
    //Guarda el id de usuario de la base de datos en la variable user_id
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user.id;
      }
    });

    //Guarda en un array las direcciones del usuario
    this.shippingDetailsService.getUserAddress(this.user_id).subscribe((response) => {
      if(response.length === 0){
        console.log("No hay direcciones guardadas");
      }else{
        this.address = response;
        console.log(this.address);
      }
    })

    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      this.addresses = JSON.parse(savedAddresses);
    }
  }

  openFormDialog(data?: any, indexToUpdate?: number) {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      data,
      width: '400px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (indexToUpdate !== undefined) {
          //Editar direccion
          this.addresses[indexToUpdate] = result;
        } else {
          //Añadir direccion
          this.addresses.push(result);
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('addresses', JSON.stringify(this.addresses));
        }
      }
    });
  }
  deleteAddress(index: number) {
    // this.addresses.splice(index, 1);
    // localStorage.setItem('addresses', JSON.stringify(this.addresses));

    this.shippingDetailsService.DeleteAddress(this.user_id).subscribe((response) => {
      console.log(response);
    })
  }

  goToPayment() {
    console.log('Navegando a /pago');
    this.router.navigate(['/pago']);
  }


}





