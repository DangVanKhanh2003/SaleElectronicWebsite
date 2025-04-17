import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountService } from '../../../../core/services/discount.service';
import { Product } from '../../../../core/models/Product';


@Component({
  selector: 'app-remove-discount-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './remove-discount-modal.component.html',
  styleUrls: ['./remove-discount-modal.component.css']
})
export class RemoveDiscountModalComponent {
  @Input() product: Product | null = null;
  @Output() saleRemoved = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();
  isVisible = true;
  isLoading = false;
  selectedSaleId: number | null = null;

  constructor(private discountService: DiscountService) {}

  show() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  onRemove() {
    if (this.product && this.selectedSaleId !== null) {
      const product = this.product;
      this.isLoading = true;
      this.discountService.removeSale(this.selectedSaleId).subscribe({
        next: () => {
          this.saleRemoved.emit(this.selectedSaleId ?? 0);
          this.closeModal();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error removing sale:', error);
          alert('Failed to remove the sale. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }
}