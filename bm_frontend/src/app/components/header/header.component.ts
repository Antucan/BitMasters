import { Component } from '@angular/core';
import { UserActionsComponent } from '../../user-actions/user-actions.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserActionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
