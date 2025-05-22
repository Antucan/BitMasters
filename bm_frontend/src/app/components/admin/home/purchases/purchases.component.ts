import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PurchaseService } from '../../purchase.service';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PurchaseService],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css'
})
export class PurchasesComponent {
  purchasesList: any[] = [];
  currentPage = 1;
  purchasesPerPage = 4;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe(purchases => {
      this.purchasesList = purchases;
    });
  }

  get paginatedPurchases(): any[] {
    const startIndex = (this.currentPage - 1) * this.purchasesPerPage;
    return this.purchasesList.slice(startIndex, startIndex + this.purchasesPerPage);
  }

  get totalPages() {
    return Math.ceil(this.purchasesList.length / this.purchasesPerPage);
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
}
