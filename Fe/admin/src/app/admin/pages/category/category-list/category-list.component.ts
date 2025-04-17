import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EditCategoryModalComponent } from '../edit-category/edit-category.component';
import { AddCategoryModalComponent } from '../add-category/add-category.component';
import { DeleteCategoryModalComponent } from '../delete-category/delete-category.component';
import { CategoryService } from '../../../../core/services/category.service';
import { CategoryRequest, CategoryResponse } from '../../../../core/models/Categories';
import { TextUtils } from '../../../../core/utils/utilsUTF8';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditCategoryModalComponent, AddCategoryModalComponent, DeleteCategoryModalComponent,
  ],  
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  
})
export class CategoryListComponent implements OnInit {
  categories: CategoryResponse[] = [];
  filteredCategories: CategoryResponse[] = [];
  searchControl: FormControl = new FormControl('');
  isAddModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible = false;
  selectedCategory: CategoryResponse = { categoryId: 0, categoryName: '', categoryIcon: '' };

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private toastr: ToastService) {
    
  }

  ngOnInit(): void {
    this.getCategory();
  }
  filterCategories() {
    const searchTerm = TextUtils.normalizeVietnamese(this.searchControl.value || '');
  
    this.filteredCategories = this.categories.filter(category =>
      TextUtils.normalizeVietnamese(category.categoryName).includes(searchTerm)
    );
  }

  openEditModal(category: CategoryResponse) {
    this.selectedCategory = { ...category };
    this.isEditModalVisible = true;
  }

  openDeleteModal(category: CategoryResponse) {
    this.selectedCategory = { ...category };
    this.isDeleteModalVisible = true;
  }

  addCategory(category: CategoryResponse) {
    this.categoryService.addCategory(category).subscribe(response => {
      console.log(' successfully:', response);
      this.getCategory();
      this.toastr.showToastSuccess("Thêm danh mục", "Thành công");
    }, error => {
      const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
      this.toastr.showToastError(errorMessage, 'Lỗi');
    });
   
  }

  updateCategory(category: CategoryRequest, categoryId: number) {
    this.categoryService.updateCategory(category, categoryId).subscribe(response => {
      console.log('Product added successfully:', response);
      this.getCategory();
      this.toastr.showToastSuccess("Sửa danh mục", "Thành công");

    }, error => {
      const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
      this.toastr.showToastError(errorMessage, 'Lỗi');    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(response => {
      this.getCategory();
      this.toastr.showToastSuccess("Xóa danh mục", "Thành công");

    }, error => {
      const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
      this.toastr.showToastError(errorMessage, 'Lỗi');
    });


  }

  closeModal()
  {
    this.isDeleteModalVisible = false;
    this.isAddModalVisible = false;
    this.isEditModalVisible = false;

  }
  getCategory(){
    this.categoryService.getCategories().subscribe((categories: CategoryResponse[]) => {
      this.categories = categories;
      this.filteredCategories = [...this.categories];
      this.filterCategories();
    });
  }
}