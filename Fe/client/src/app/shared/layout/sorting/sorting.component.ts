import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
  @Input() sortOptions: { id: number,key:string, label: string, icon: string, isActive: boolean }[] = [];
  @Output() sortChange = new EventEmitter<{ sortType: number }>();  // Correctly typed output event

  selectedSort: number | null = null;

  selectSortOption(optionId: number): void {
    // Update the selected sort
    this.selectedSort = optionId;

    // Deactivate all options and activate the selected one
    this.sortOptions.forEach(p => {
      p.isActive = false;
    });
    this.sortOptions[optionId].isActive = true;

    // Emit the selected sort option to the parent
    this.sortChange.emit({ sortType: optionId });

    // Optionally, log the selected sorting method
    console.log(`Sorting by: ${optionId}`);
  }
}
