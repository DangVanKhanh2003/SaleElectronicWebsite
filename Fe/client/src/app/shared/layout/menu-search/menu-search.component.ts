import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/Categories';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-search.component.html',
  styleUrl: './menu-search.component.css'
})
export class MenuSearchComponent implements OnInit {
  isMenuVisible = false
  categories: Array<Category> = []

  constructor(private category: CategoryService){

  }

  ngOnInit(): void {
                                                                    
    this.category.getAllCategory().subscribe(result =>{
      this.categories = result
    })
  
  }
  
}
