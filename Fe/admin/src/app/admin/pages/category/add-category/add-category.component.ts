import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryResponse } from '../../../../core/models/Categories';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryModalComponent {
  @Output() categoryAdded = new EventEmitter<CategoryResponse>();
  @Output() close = new EventEmitter<void>();

  newCategory: CategoryResponse = { categoryId: 0, categoryName: '', categoryIcon: '' };

  onSubmit() {
    this.categoryAdded.emit({ ...this.newCategory });
    this.newCategory = { categoryId: 0, categoryName: '', categoryIcon: '' };
    this.close.emit();
  }
}
