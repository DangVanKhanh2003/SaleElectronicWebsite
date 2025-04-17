import { Component, OnInit } from '@angular/core';
import { Product, productRequest, SpecificationRequest } from '../../../../core/models/Product';
import { CategoryResponse } from '../../../../core/models/Categories';
import { ProductsService } from '../../../../core/services/products.service';
import { CategoryService } from '../../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { TextUtils } from '../../../../core/utils/utilsUTF8';
import { response } from 'express';
import { ToastService } from '../../../../core/services/toast.service';
import { SpecificationService } from '../../../../core/services/specification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductModalComponent],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: CategoryResponse[] = [];
  searchTerm = '';
  categoryFilterId = 0;
  sortBy = '';
  selectedProduct: Product | null = null;
  modalType: 'add' | 'edit' | 'delete' = 'add';
  isModalVisible = false;
  loading = false;
  error: string | null = null;
  currentPage = 1;
  pageSize = 15;
  totalPages = 1;
  pages: number[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoryService,
    private toast: ToastService,
    private specificationService: SpecificationService
  ) {}

  ngOnInit(): void {
    console.log("isModalVisible: " + this.isModalVisible);
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.loading = true;
    try {
        this.categoriesService.getCategories().subscribe((categories: CategoryResponse[]) => {
        this.categories = categories;
      });; 
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load categories';
      this.loading = false;
      console.error(err);
    }
  }

  loadProducts(): void {
    this.loading = true;
    this.productsService.getAllProduct().subscribe({
      next: (products) => {
        this.products = products;
        this.currentPage = 1;
        this.filterProducts();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  filterProducts(): void {
    let temp = [...this.products];
    if (this.searchTerm) {
      const keyword = this.searchTerm;
    
      temp = temp.filter(p => {
        const name = p.productName || '';
        
        return TextUtils.vietnameseIncludes(name, keyword) ||
               TextUtils.fuzzyMatch(name, keyword);
      });
    }


    if (this.categoryFilterId) {
      

      temp = temp.filter(p => p.category.categoryId == this.categoryFilterId);
    }

    if (this.sortBy === 'nameAsc') {
      temp.sort((a, b) =>
        a.productName.localeCompare(b.productName, 'vi', { sensitivity: 'base' })
      );
    } else if (this.sortBy === 'nameDesc') {
      temp.sort((a, b) =>
        b.productName.localeCompare(a.productName, 'vi', { sensitivity: 'base' })
      );
    } else if (this.sortBy === 'priceAsc') {
      temp.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceDesc') {
      temp.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'dateAsc') {
      temp.sort((a, b) => a.productId - b.productId);
    } else if (this.sortBy === 'dateDesc') {
      temp.sort((a, b) => b.productId - a.productId);
    }
    

    this.totalPages = Math.ceil(temp.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredProducts = temp.slice(startIndex, startIndex + this.pageSize);
  }

  openModal(type: 'add' | 'edit' | 'delete', product: Product | null = null): void {
    this.modalType = type;
    this.selectedProduct = product;
    this.isModalVisible = true;
    console.log("isModalVisible: " + this.isModalVisible);

  }

  closeModal(): void {
    this.isModalVisible = false;  
    console.log("isModalVisible: " + this.isModalVisible);
  }

  handleProductSaved(product: productRequest, id: number, speRequestList: SpecificationRequest[]): void {
    if (this.modalType === 'add') 
    {
      this.productsService.addProduct(product).subscribe(
        response => {
          this.addListSpecification(id ,speRequestList)
          this.loadProducts()
          this.toast.showToastSuccess("Thêm sản phẩm thành công", "Thành công");

        },
         error => {
          const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
          this.toast.showToastError(errorMessage, 'Lỗi');    });
    } 
    else if (this.modalType === 'edit') {
      this.productsService.updateProduct(product, id).subscribe( response => {
        this.updateAllSpecification(id, speRequestList)
        this.loadProducts()
        this.toast.showToastSuccess("Chỉnh sửa sản phẩm thành công", "Thành công");

      },
       error => {

        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, 'Lỗi');    });
    }
    this.closeModal();
  }

  handleProductDeleted(id: number): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => this.error = 'Failed to delete product'
    });
    this.closeModal();
  }

  updateAllSpecification(idproduct: number,speRequestList: SpecificationRequest[])
  {
    debugger
    this.specificationService.editSpecification(idproduct, speRequestList).subscribe({
      next: () => {},
      error: (error) => {
        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, 'Lỗi');    
        }
      });

  }

  addListSpecification(idproduct: number, speRequestList: SpecificationRequest[])
  {
    this.specificationService.addSpecification(idproduct, speRequestList).subscribe({
      next: () => {},
      error: (error) => {
        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, 'Lỗi');    
        }
      });

  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterProducts();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.filterProducts();
  }

}
