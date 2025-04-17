import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryRequest, CategoryResponse } from '../../../../core/models/Categories';

@Component({
  selector: 'app-edit-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryModalComponent {
  @Input() category!: CategoryRequest;
  @Output() categoryUpdated = new EventEmitter<{ category: CategoryRequest, categoryId: number }>();
  @Output() close = new EventEmitter<void>();
  @Input() categoryId: number = 0;
  onSubmit() {
    this.categoryUpdated.emit({ category: this.category, categoryId: this.categoryId });
    this.close.emit();
  }
}
