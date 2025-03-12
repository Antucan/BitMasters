import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.css'
})
export class UserActionsComponent {

  constructor(private router: Router) {} 
  redirectTo(route: string): void {
    this.router.navigate([route]); 
  }

}
