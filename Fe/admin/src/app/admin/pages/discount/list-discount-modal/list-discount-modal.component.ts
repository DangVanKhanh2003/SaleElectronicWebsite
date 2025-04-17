import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/Product';


@Component({
  selector: 'app-list-discount-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-discount-modal.component.html',
  styleUrls: ['./list-discount-modal.component.css']
})
export class ListDiscountModalComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  isVisible = true;

  
  show() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  calculateDiscountedPrice(price: number | undefined, percentSale: number): number {
    if (!price) return 0;
    return price - (price * (percentSale / 100));
  }
}