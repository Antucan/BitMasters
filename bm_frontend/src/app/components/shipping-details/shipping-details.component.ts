import { Component, OnInit } from '@angular/core'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-details',
  imports: [MatDialogModule, CommonModule],
  standalone: true,
  templateUrl: './shipping-details.component.html',
  styleUrl: './shipping-details.component.css'

})
export class ShippingDetailsComponent implements OnInit {
  addresses: any[] = [];

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
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
          this.addresses[indexToUpdate] = result;
        } else {
          this.addresses.push(result);
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('addresses', JSON.stringify(this.addresses));
        }
      }
    });
  }
  deleteAddress(index: number) {
    this.addresses.splice(index, 1); 
    localStorage.setItem('addresses', JSON.stringify(this.addresses)); 
  }

  goToPayment() {
    console.log('Navegando a /pago');
    this.router.navigate(['/pago']);
  }
  
  
}
  

  


