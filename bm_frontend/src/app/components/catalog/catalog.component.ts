import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  visible = false;

  ngOnInit() {
    setTimeout(() => this.visible = true, 10); 
  }

  close() {
    this.visible = false;
    setTimeout(() => this.closeModal.emit(), 300); 
  }
}
