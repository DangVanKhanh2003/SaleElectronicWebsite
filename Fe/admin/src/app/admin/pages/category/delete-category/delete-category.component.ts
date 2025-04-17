import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryResponse } from '../../../../core/models/Categories';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryModalComponent {
  @Output() categoryDeleted = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();
  @Input() category!: CategoryResponse;

  onDelete() {
    this.categoryDeleted.emit(this.category.categoryId);
    this.close.emit();
  }
}
