import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsList: any[] = [];
  currentPage = 1;
  productsPerPage = 3;
  searchTerm: string = '';
  editingProduct: any = null; // Producto en edición
  isEditing: boolean = false; // Estado de edición

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.productsList = products;
    });
  }

  get filteredProducts(): any[] {
    if (!this.searchTerm.trim()) {
      return this.productsList;
    }
    return this.productsList.filter(product =>
      `${product.name} ${product.description}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.productsPerPage);
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
    return Math.ceil(this.filteredProducts.length / this.productsPerPage);
  }

  // Borrar producto
  deleteProduct(productId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.productsList = this.productsList.filter(product => product.id !== productId);
          alert('Producto eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          alert('Error al eliminar el producto. Vuelve a intentarlo.');
        }
      });
    }
  }

  // Editar producto client
  startEdit(product: any) {
    this.isEditing = true;
    this.editingProduct = { ...product }; // Clonar el producto para editar
  }

  // Guardar cambios
  saveEdit() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct).subscribe({
        next: (updateProduct) => {
          const index = this.productsList.findIndex(product => product.id === updateProduct.id);
          if (index !== -1) {
            this.productsList[index] = updateProduct; // Actualizar el producto en la lista
          }
          alert('Producto actualizado correctamente');
          this.editingProduct = null; // Limpiar el producto en edición
          this.isEditing = false; // Salir del modo de edición
          //actualizar la lista de productos
          this.productService.getProducts().subscribe(products => {
            this.productsList = products;
          });
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
          alert('Error al actualizar el producto. Vuelve a intentarlo.');
        }
      });
    }
  }

  // Método para cancelar la edición
  cancelEdit() {
    this.isEditing = false; // Cambiar el estado a no edición
    this.editingProduct = null;
  }


}

