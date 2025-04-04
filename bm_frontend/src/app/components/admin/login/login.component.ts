import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
 @Output() adminChange = new EventEmitter<any>;
admin: any = "casa";

constructor(private adminService: AdminService){}
//metodo para cambiar el valor de admin
 updateAdmin(newAdmin: any) {
   this.admin = newAdmin;
   this.adminService.setAdmin(this.admin);
   this.adminChange.emit(this.admin);
 }
}

