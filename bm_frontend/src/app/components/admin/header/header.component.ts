import { Component, Input, OnInit } from '@angular/core';
import { BannerComponent } from "../../admin/banner/banner.component";
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';

@Component({
  selector: 'admin-header',
  imports: [BannerComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private adminService: AdminService) { }

}
