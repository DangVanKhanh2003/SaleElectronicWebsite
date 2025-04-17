import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sale } from '../../../../core/models/Sale';
import { Product } from '../../../../core/models/Product';
import { DiscountService } from '../../../../core/services/discount.service';

@Component({
  selector: 'app-edit-discount-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-discount-modal.component.html',
  styleUrls: ['./edit-discount-modal.component.css']
})
export class EditDiscountModalComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() saleUpdated = new EventEmitter<Sale>();
  @Output() close = new EventEmitter<void>();
  editForm: FormGroup;
  isVisible = true;
  isLoading = false; // Add loading state

  constructor(private fb: FormBuilder, private discountService: DiscountService) {
    this.editForm = this.fb.group({
      saleId: [0],
      productId: [0],
      percentSale: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      numProduct: [0, [Validators.required, Validators.min(0)]],
      numProductSold: [0, [Validators.required, Validators.min(0)]],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.editForm.patchValue({
        saleId: this.product.sale?.saleId || 0,
        productId: this.product.productId,
        percentSale: this.product.sale?.percentSale || null,
        numProduct: this.product.sale?.numProduct || 0,
        numProductSold: this.product.sale?.numProductSold || 0,
        startAt: this.product.sale?.startAt || '',
        endAt: this.product.sale?.endAt || ''
      });
    }
  }

  show() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  onSubmit() {
    if (this.editForm.valid && this.product) {
      const startAt = new Date(this.editForm.get('startAt')?.value);
      const endAt = new Date(this.editForm.get('endAt')?.value);

      if (startAt > endAt) {
        alert('End date must be after start date.');
        return;
      }

      const sale: Sale = {
        saleId: this.editForm.get('saleId')?.value,
        productId: this.product.productId,
        numProduct: this.editForm.get('numProduct')?.value,
        numProductSold: this.editForm.get('numProductSold')?.value,
        startAt: this.editForm.get('startAt')?.value,
        endAt: this.editForm.get('endAt')?.value,
        percentSale: this.editForm.get('percentSale')?.value
      };

      this.isLoading = true; // Show loading state
      this.discountService.updateSale(sale).subscribe({
        next: (updatedSale) => {
          this.saleUpdated.emit(updatedSale);
          this.closeModal();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating sale:', error);
          alert('Failed to update the sale. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }
}