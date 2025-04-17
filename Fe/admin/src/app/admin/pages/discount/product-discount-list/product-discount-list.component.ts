import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddDiscountModalComponent } from '../add-discount-modal/add-discount-modal.component';
import { EditDiscountModalComponent } from '../edit-discount-modal/edit-discount-modal.component';
import { RemoveDiscountModalComponent } from '../remove-discount-modal/remove-discount-modal.component';
import { ListDiscountModalComponent } from '../list-discount-modal/list-discount-modal.component';
import { Product } from '../../../../core/models/Product';
import { ProductsService } from '../../../../core/services/products.service';
import { DiscountService } from '../../../../core/services/discount.service';
import { Sale } from '../../../../core/models/Sale';
import { TextUtils } from '../../../../core/utils/utilsUTF8';

@Component({
  selector: 'app-product-discount-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddDiscountModalComponent,
    EditDiscountModalComponent,
    RemoveDiscountModalComponent,
    ListDiscountModalComponent
  ],
  templateUrl: './product-discount-list.component.html',
  styleUrls: ['./product-discount-list.component.css']
})
export class ProductDiscountListComponent implements OnInit {
  products$!: Observable<Product[]>;
  filteredProducts: Product[] = [];
  filterForm: FormGroup;
  isAddModalVisible = false;
  isEditModalVisible = false;
  isRemoveModalVisible = false;
  isListModalVisible = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductsService,
    private discountService: DiscountService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      searchInput: [''],
      discountFrom: [null],
      discountTo: [null],
      dateFrom: [null]
    });
  }

  ngOnInit() {
    this.products$ = this.productService.getAllProduct();
    this.products$.subscribe(products => {
      this.filteredProducts = [...products];
    });
  }

  // Method to calculate the highest discount percentage for a product
  getMaxDiscount(sales: Sale[] | null): number {
    if (!sales || sales.length === 0) {
      return 0;
    }
    return Math.max(...sales.map(sale => sale.percentSale));
  }

  calculateDiscountedPrice(price: number, percentSale: number): number {
    return price - (price * (percentSale / 100));
  }

  filterProducts() {
    const rawSearch = this.filterForm.get('searchInput')?.value || '';
    const searchTerm = TextUtils.normalizeVietnamese(rawSearch);
  
    this.products$.subscribe(products => {
      this.filteredProducts = products.filter(product =>
        TextUtils.normalizeVietnamese(product.productName || '').includes(searchTerm)
      );
  
      this.applyFilters();
    });
  }

  applyFilters() {
    const discountFrom = this.filterForm.get('discountFrom')?.value || 0;
    const discountTo = this.filterForm.get('discountTo')?.value || 100;
    const dateFrom = this.filterForm.get('dateFrom')?.value ? new Date(this.filterForm.get('dateFrom')?.value) : null;

    this.products$.subscribe(products => {
      this.filteredProducts = products.filter(product => {
        const discountPercentages = product.sale && Array.isArray(product.sale) ? product.sale.map(s => s.percentSale) : [0];
        const maxDiscount = Math.max(...discountPercentages);
        const startDates = product.sale && Array.isArray(product.sale) ? product.sale.map(s => new Date(s.startAt)) : [];
        const earliestStartDate = startDates.length > 0 ? new Date(Math.min(...startDates.map(d => d.getTime()))) : null;

        const matchesDiscount = maxDiscount >= discountFrom && maxDiscount <= discountTo;
        const matchesDate = !dateFrom || !earliestStartDate || earliestStartDate >= dateFrom;

        const searchTerm = this.filterForm.get('searchInput')?.value?.toLowerCase() || '';
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm);

        return matchesDiscount && matchesDate && matchesSearch;
      });
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.products$.subscribe(products => {
      this.filteredProducts = [...products];
    });
  }

  openEditModal(product: Product) {
    this.selectedProduct = { ...product };
    this.isEditModalVisible = true;
  }

  openRemoveModal(product: Product) {
    this.selectedProduct = { ...product };
    this.isRemoveModalVisible = true;
  }

  openListModal(product: Product) {
    this.selectedProduct = { ...product };
    this.isListModalVisible = true;
  }

  addSale(sale: Sale) {
    this.discountService.addSale(sale).subscribe({
      next: () => {
        this.products$ = this.productService.getAllProduct();
        this.products$.subscribe(products => {
          this.filteredProducts = [...products];
        });
        this.isAddModalVisible = false;
      },
      error: (error) => {
        console.error('Error adding sale:', error);
        alert('Failed to add the sale. Please try again.');
      }
    });
  }

  updateSale(sale: Sale) {
    this.discountService.updateSale(sale).subscribe({
      next: () => {
        this.products$ = this.productService.getAllProduct();
        this.products$.subscribe(products => {
          this.filteredProducts = [...products];
        });
        this.isEditModalVisible = false;
      },
      error: (error) => {
        console.error('Error updating sale:', error);
        alert('Failed to update the sale. Please try again.');
      }
    });
  }

  removeSale(saleId: number) {
    this.discountService.removeSale(saleId).subscribe({
      next: () => {
        this.products$ = this.productService.getAllProduct();
        this.products$.subscribe(products => {
          this.filteredProducts = [...products];
        });
        this.isRemoveModalVisible = false;
      },
      error: (error) => {
        console.error('Error removing sale:', error);
        alert('Failed to remove the sale. Please try again.');
      }
    });
  }
}