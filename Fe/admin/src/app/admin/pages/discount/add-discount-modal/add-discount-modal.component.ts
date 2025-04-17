import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../../core/services/products.service';
import { DiscountService } from '../../../../core/services/discount.service';
import { Product } from '../../../../core/models/Product';
import { Sale } from '../../../../core/models/Sale';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-discount-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.css']
})
export class AddDiscountModalComponent implements OnInit {
  @Output() saleAdded = new EventEmitter<Sale>();
  @Output() close = new EventEmitter<void>();
  addForm: FormGroup;
  products$!: Observable<Product[]>;
  isVisible = true;
  showDiscountWarning = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private discountService: DiscountService
  ) {
    this.addForm = this.fb.group({
      productId: ['', Validators.required],
      percentSale: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      numProduct: [0, [Validators.required, Validators.min(0)]],
      numProductSold: [0, [Validators.required, Validators.min(0)]],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.products$ = this.productService.getAllProduct();
  }

  show() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
    this.addForm.reset();
    this.addForm.markAsPristine();
    this.addForm.markAsUntouched();
    this.showDiscountWarning = false;
  }

  checkExistingDiscount() {
    const productId = parseInt(this.addForm.get('productId')?.value);
    this.discountService.getSaleByProductId(productId).subscribe(sale => {
      this.showDiscountWarning = sale != null;
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      const startAt = new Date(this.addForm.get('startAt')?.value);
      const endAt = new Date(this.addForm.get('endAt')?.value);

      if (startAt > endAt) {
        alert('End date must be after start date.');
        return;
      }

      const productId = parseInt(this.addForm.get('productId')?.value);
      this.discountService.getSaleByProductId(productId).subscribe(existingSale => {
        if (existingSale) {
          alert('This product already has a discount. Please remove the existing discount first.');
          return;
        }

        this.discountService.getSales().subscribe(sales => {
          const newSale: Sale = {
            saleId: sales.length + 1, // Ideally generated by backend
            productId,
            numProduct: this.addForm.get('numProduct')?.value,
            numProductSold: this.addForm.get('numProductSold')?.value,
            startAt: this.addForm.get('startAt')?.value,
            endAt: this.addForm.get('endAt')?.value,
            percentSale: this.addForm.get('percentSale')?.value
          };

          this.saleAdded.emit(newSale);
          this.closeModal();
        });
      });
    }
  }
}
