import { Component } from '@angular/core';
import { UserActionsComponent } from '../../user-actions/user-actions.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserActionsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
