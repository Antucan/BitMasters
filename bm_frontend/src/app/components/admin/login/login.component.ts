import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 admin = null;
 @Output() adminChange = new EventEmitter<any>;

 updateAdmin(newAdmin: any) {
   this.admin = newAdmin;
   this.adminChange.emit(this.admin);
 }
}

