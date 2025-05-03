import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  @Output() confirm = new EventEmitter<void>();

  onRemoveCart() {
    this.confirm.emit();
    this.onClose();
  }
}

