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
    private authService: AuthService
  ) {
    this.loginService.loginVisible$.subscribe(visible => {
      this.loginVisible = visible;
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user.id;
        this.loadAddresses();
      }
    });
  }

  loadAddresses(): void {
    this.shippingDetailsService.getUserAddress(this.user_id).subscribe({
      next: (response) => {
        if (response.length === 0) {
          console.log('No hay direcciones guardadas');
        } else {
          this.address = response;
          console.log(this.address);
        }
      },
      error: (err) => console.error('Error al cargar direcciones:', err)
    });
  }

  openFormDialog(data?: any, indexToUpdate?: number) {
  const dialogRef = this.dialog.open(ModalFormComponent, {
    data,
    width: '400px',
    maxWidth: '90vw'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const formattedResult = {
        name: result.name,
        street_type: result.streetType,
        city: result.city,
        zip_code: result.zipCode
      };

      if (data?.id) {

        this.shippingDetailsService.updateAddress(data.id, formattedResult).subscribe({
          next: () => {
            this.loadAddresses();
            console.log('Dirección actualizada');
          },
          error: (err) => console.error('Error al actualizar:', err)
        });

      } else {
        this.shippingDetailsService.addAddress(this.user_id, formattedResult).subscribe({
          next: () => {
            this.loadAddresses();
            console.log('Dirección añadida');
          },
          error: (err) => console.error('Error al añadir:', err)
        });
      }
    }
  });
}



  deleteAddress(addressId: number) {
    if (confirm('¿Estás seguro de eliminar esta dirección?')) {
      this.shippingDetailsService.deleteAddress(addressId).subscribe({
        next: () => {
          this.loadAddresses();
          console.log('Dirección eliminada');
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  goToPayment() {
    console.log('Navegando a /pago');
    this.router.navigate(['/pago']);
  }
}
