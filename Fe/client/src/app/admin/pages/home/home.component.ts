import { Component, ElementRef, NgModule, QueryList, ViewChildren, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { error } from 'node:console';
import { ToastService } from '../../../core/services/toast.service';
import { CategoryService } from '../../../core/services/category.service';
import { response } from 'express';
import { Category } from '../../../core/models/Categories';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Array<Product> = [];
  productDiscounts: Array<Product> = [];
  listProductByCategory: Array<Product[]> = []
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private currentSliderIndex: number = -1;
  private mouseMoveListener: Function | null = null;
  private mouseUpListener: Function | null = null;
  private categories: Array<Category> = [];
  @ViewChildren('productSlider') sliders!: QueryList<ElementRef>;
  
  

  constructor(
    private productService: ProductsService, 
    private shoppingCartService: ShoppingCartService,
    private categoryService: CategoryService,
    private renderer: Renderer2,
    private toast: ToastService,
  ) {}
      
  ngOnInit(): void {
    this.getAllProduct();
    this.getProductDiscounts();
    this.getCategory()
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe({
      next: (respone) => {
        this.products = respone
      },
      error: (error) =>{
        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, "Lỗi")
      }});

  }
  addShoppingCart(itemProduct: Product) {
    this.shoppingCartService.addShoppingCartItem({
      customerId: 1,
      productId: itemProduct.productId,
      amount: 1,
      colorId: 1
    }).subscribe(
      response => console.log('Product added successfully:', response),
      error => console.error('Error adding product:', error)
    );
  }

  getProductDiscounts(){
    this.productService.getAllProductHaveDiscoutn().subscribe({
      next: (respone) => {
        this.productDiscounts = respone
      },
      error: (error) =>{
        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, "Lỗi")
      }
    });
  }

  getCategory(){
    this.categoryService.getAllCategory().subscribe({
      next: (response) =>{
        this.categories = response;
        this.getListProductByCategory();
      },
      error: (error) =>{
        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, "Lỗi")
      }
    })
  }
  getListProductByCategory(){
    this.categories.forEach(category => {
      this.productService.getProductByIdCategory(category.categoryId).subscribe({
        next: (products) => {
          this.listProductByCategory.push(products)
        },
        error: (error) => {
          const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
          this.toast.showToastError(errorMessage, "Lỗi")
        }
      });
    });
  }
  onMouseDown(event: MouseEvent, index: number): void {
    const slider = this.sliders.toArray()[index].nativeElement;
    this.isDragging = true;
    this.startX = event.pageX;
    this.scrollLeft = slider.scrollLeft;
    this.currentSliderIndex = index;
  
    this.renderer.setStyle(slider, 'cursor', 'grabbing');
    this.renderer.setStyle(slider, 'user-select', 'none');
  
    this.removeDocumentListeners();
  
    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e) => this.onMouseMove(e));
    this.mouseUpListener = this.renderer.listen('document', 'mouseup', () => this.onMouseUp());
    
    event.preventDefault(); // Prevent default behavior (text selection, etc.)
  }
  
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging || this.currentSliderIndex === -1) return;
  
    const slider = this.sliders.toArray()[this.currentSliderIndex].nativeElement;
    const x = event.pageX;
    const dx = x - this.startX;
  
    // Smooth scroll using requestAnimationFrame
    requestAnimationFrame(() => {
      slider.scrollLeft = this.scrollLeft - dx;
    });
  
    event.preventDefault(); // Prevent text selection during drag
  }
  
  onMouseUp(): void {
    if (this.currentSliderIndex !== -1 && this.sliders && this.currentSliderIndex < this.sliders.length) {
      const slider = this.sliders.toArray()[this.currentSliderIndex].nativeElement;
      this.renderer.setStyle(slider, 'cursor', 'grab');
      this.renderer.setStyle(slider, 'user-select', 'auto');
    }
  
    this.isDragging = false;
    this.currentSliderIndex = -1;
    this.removeDocumentListeners();
  }
  
  private removeDocumentListeners(): void {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
      this.mouseMoveListener = null;
    }
  
    if (this.mouseUpListener) {
      this.mouseUpListener();
      this.mouseUpListener = null;
    }
  }
  
  ngOnDestroy(): void {
    this.removeDocumentListeners();
  }
  
  slideNext(index: number): void {
    if (index < 0 || index >= this.sliders.length) return;
  
    const slider = this.sliders.toArray()[index].nativeElement;
    const scrollAmount = 500; // Scroll by 500px (adjust as needed)
    
    slider.scrollLeft += scrollAmount;
  }
  
  slidePrev(index: number): void {
    if (index < 0 || index >= this.sliders.length) return;
  
    const slider = this.sliders.toArray()[index].nativeElement;
    const scrollAmount = 500; // Scroll by 500px (adjust as needed)
    
    slider.scrollLeft -= scrollAmount;
  }
}