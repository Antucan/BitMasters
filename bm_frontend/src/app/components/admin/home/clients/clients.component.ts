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
  searchTerm: string = '';
  editingClient: any = null; // Cliente en edición
  isEditing: boolean = false; // Estado de edición

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getClients().subscribe(clients => {
      this.clientsList = clients;
    });
  }

  get filteredClients(): any[] {
    if (!this.searchTerm.trim()) {
      return this.clientsList;
    }
    return this.clientsList.filter(client =>
      `${client.name} ${client.surname}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

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

  deleteClient(clientId: number | string) {
    if (confirm('Estás seguro de que quieres borrar el cliente?')) {
      this.userService.deleteUser(Number(clientId)).subscribe({
        next: () => {
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

  // Método para iniciar la edición
  startEdit(client: any) {
    this.isEditing = true; // Cambiar el estado a edición
    this.editingClient = { ...client }; // Crear una copia del cliente para editar
  }

  // Método para guardar los cambios
  saveEdit() {
    if (this.editingClient) {
      this.userService.updateUser(this.editingClient).subscribe({
        next: (updatedClient) => {
          // Actualizar la lista de clientes con los datos editados
          const index = this.clientsList.findIndex(client => client.id === updatedClient.id);
          if (index !== -1) {
            this.clientsList[index] = updatedClient;
          }
          this.editingClient = null; // Salir del modo de edición
          alert('Cliente actualizado.');
          this.isEditing = false; // Cambiar el estado a no edición
        },
        error: (err) => {
          console.error('Error actualizando cliente:', err);
          alert('Un error ha ocurrido al actualizar el cliente. Vuelve a intentarlo.');
        }
      });
    }
  }

  // Método para cancelar la edición
  cancelEdit() {
    this.isEditing = false; // Cambiar el estado a no edición
    this.editingClient = null;
  }
}