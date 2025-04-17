import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../../core/models/Product';
import { ProductsService } from '../../../core/services/products.service';
import { Category } from '../../../core/models/Categories';
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { SortingComponent } from "../../../shared/layout/sorting/sorting.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, SortingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnChanges{
  route: ActivatedRoute = inject(ActivatedRoute)
  categories: Array<Category> = []
  products: Product[]=[]
  categoryId: number | null = null
  sortOptions = [
      { id: 0,key:'null', label: 'Không sắp xếp', icon: 'bi bi-eye', isActive: true },
      { id: 1,key:'price_desc', label: 'Giá Cao - Thấp', icon: 'bi bi-sort-down-alt', isActive: false },
      { id: 2,key:'price_asc', label: 'Giá Thấp - Cao', icon: 'bi bi-sort-up', isActive: false },
      { id: 3,key:'name_asc', label: 'Từ A-Z', icon: 'bi bi-percent', isActive: false },
      { id: 4,key:'name_desc', label: 'Từ Z-A', icon: 'bi bi-eye', isActive: false },
    ];
  constructor(private product: ProductsService, private category: CategoryService, private shoppingCart: ShoppingCartService){
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'))
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id']; 
      if(this.categoryId)
        {
          this.product.getProductByIdCategory(this.categoryId).subscribe(result =>{
            this.products = result
         })
     
        }
        else
        {
          this.product.getAllProduct().subscribe(result =>{
            this.products = result
         }) 
        }
    });
    
    
    this.category.getAllCategory().subscribe(result =>{
      this.categories = result
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.categoryId)
      {
        this.product.getProductByIdCategory(this.categoryId).subscribe(result =>{
          this.products = result
       })
   
      }
      else
      {
        this.product.getAllProduct().subscribe(result =>{
          this.products = result
       }) 
      }
  }
  addShoppingCart(itemProduct: Product){
    this.shoppingCart.addShoppingCartItem({
        customerId: 1,
        productId: itemProduct.productId,
        amount: 1,
        colorId: 1
      }).subscribe(response => {
        console.log('Product added successfully:', response);
      }, error => {
        console.error('Error adding product:', error);
      });
  }

  onSortChange(event: { sortType: number }) {
    if(this.categoryId)
      {
        this.product.getProductByIdCategory(this.categoryId, this.sortOptions[event.sortType].key).subscribe(result =>{
          this.products = result
       })
   
      }
      else
      {
        this.product.getAllProduct(this.sortOptions[event.sortType].key).subscribe(result =>{
          this.products = result
       }) 
      }
  }
}
