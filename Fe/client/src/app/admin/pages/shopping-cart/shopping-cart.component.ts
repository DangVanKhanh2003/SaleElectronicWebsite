import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemShoppingCart } from '../../../core/models/ShoppingCart';
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { OrderpendingService } from '../../../core/services/orderpending.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ListProductOrederPendingRequest, OrderPendingRequest } from '../../../core/models/OrderPending';
import { Toast } from 'ngx-toastr';
import { ToastService } from '../../../core/services/toast.service';
import { ProductsService } from '../../../core/services/products.service';
import { ColorResponse } from '../../../core/models/Color';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, DoCheck{

  shoppingCarts: ItemShoppingCart[] | [] = []
  totalPrice: number = 0;
  constructor(private shoppingCartService: ShoppingCartService,
              private orderPending: OrderpendingService,
              private toast: ToastService,
              private productService: ProductsService,
  ){

  }
  ngOnInit(): void {
    this.shoppingCartService.getShoppingCartByIdCustomer(1).subscribe(result =>{
      this.shoppingCarts = result
      this.ResetTotalPrice
      this.setColorColection();
    })
  }

  ngDoCheck(): void {
    this.ResetTotalPrice()
  }

  onInputChange(event: Event, item: ItemShoppingCart) {
    const inputValue = (event.target as HTMLInputElement).value;
    const amount = Number(inputValue);
  
    this.shoppingCartService.EditShoppingCartItem(item.shoppingCartItemId, amount, item.colorId).pipe(
      switchMap(() => this.shoppingCartService.getShoppingCartByIdCustomer(1))
    ).subscribe({
      next: (result) => {
        this.shoppingCarts = result; // Update shopping cart list
      },
      error: (error) => {
        console.error('Error updating shopping cart:', error);
      }
    });

    this.ResetTotalPrice()
  }
  
  removeItem(item :ItemShoppingCart){
    this.shoppingCarts = this.shoppingCarts.filter(cartItem => cartItem !== item);
    this.shoppingCartService.deleteItem(item.shoppingCartItemId).subscribe();
  }

  ResetTotalPrice() {
    let selectedItems = this.shoppingCarts.filter(item => item.isCheck);
    this.totalPrice = 0
    
    selectedItems.forEach(item => {
      let percentSale: number = item.sale?.percentSale ?? 0
      this.totalPrice += item.amount * item.price *(1 - percentSale  / 100)
    });
  }
  
  removeCheckedItems() {
    let selectedItems = this.shoppingCarts.filter(item => item.isCheck);

    selectedItems.forEach(item => {
        this.removeItem(item);
    });

    this.shoppingCarts = this.shoppingCarts.filter(item => !item.isCheck);
}


  Buy() {
    let cusId: number = 1;

    let selectedItems = this.shoppingCarts.filter(item => item.isCheck);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }

    let listOrderPending: ListProductOrederPendingRequest[] = selectedItems.map(item => ({...item}));

    let orderPending: OrderPendingRequest = {
        customerId: cusId,
        listProductOrederPending: listOrderPending
    };

    this.orderPending.addOrderPending(orderPending).subscribe({
      next: (response) => {
          this.removeCheckedItems()
          this.ResetTotalPrice()
          this.toast.showToastSuccess("Đặt hàng thành công. Hãy chờ nhân viên duyệt đơn hàng!", "Thành công")
        },
      error: (error) => {
        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, 'Lỗi');            }
    });
  }

  onColorChange(item: ItemShoppingCart) {
    item.colorCode = item.colorColection.filter(p => p.colorId == item.colorId)[0]?.colorCode;

    this.shoppingCartService.EditShoppingCartItem(item.shoppingCartItemId, item.amount, item.colorId).subscribe(
      {
        next: (response) =>{
          
        },
        error: (error) => {
          const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
          this.toast.showToastError(errorMessage, 'Lỗi');
        }
      }
    )
  }

  setColorColection(){
    this.shoppingCarts.forEach(item => {
      this.getColorByIdProduct(item.productId, item);
    });
  }
  getColorByIdProduct(productId: number, item: ItemShoppingCart): void {
    this.productService.getColorByIdProduct(productId).subscribe({
      next: (response: ColorResponse[]) => {
        item.colorColection = response;
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
        this.toast.showToastError(errorMessage, 'Lỗi');
      }
    });
  }
  
}