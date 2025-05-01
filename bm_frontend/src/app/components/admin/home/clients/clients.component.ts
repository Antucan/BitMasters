import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clientsList: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Llama al método getClients del servicio y actualiza la propiedad clientsList
    this.userService.getClients().subscribe(clients => {
      this.clientsList = clients; // Asigna la lista de clientes
    });
  }

}
