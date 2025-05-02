import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [UserService],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clientsList: any[] = [];
  currentPage = 1;
  clientsPerPage = 5;
  searchTerm: string = ''; // Nuevo término de búsqueda

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getClients().subscribe(clients => {
      this.clientsList = clients;
    });
  }

  // Filtrar clientes según el término de búsqueda
  get filteredClients(): any[] {
    if (!this.searchTerm.trim()) {
      return this.clientsList;
    }
    return this.clientsList.filter(client =>
      `${client.name} ${client.surname}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Obtener clientes paginados de la lista filtrada
  get paginatedClients(): any[] {
    const startIndex = (this.currentPage - 1) * this.clientsPerPage;
    return this.filteredClients.slice(startIndex, startIndex + this.clientsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredClients.length / this.clientsPerPage);
  }

  // Método para eliminar un cliente
  deleteClient(clientId: number | string) {
    if (confirm('Estás seguro de que quieres borrar el cliente?')) {
      this.userService.deleteUser(Number(clientId)).subscribe({
        next: () => {
          // Actualizar la lista de clientes al eliminar el cliente
          this.clientsList = this.clientsList.filter(client => client.id !== Number(clientId));
          alert('Cliente borrado.');
        },
        error: (err) => {
          console.error('Error borrando cliente:', err);
          alert('Un error ha ocurrido al borrar el cliente. Vuelve a intentarlo.');
        }
      });
    }
  }
}
