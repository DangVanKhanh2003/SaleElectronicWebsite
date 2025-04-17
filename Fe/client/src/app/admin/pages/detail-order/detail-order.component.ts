import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { ProductsService } from '../../../core/services/products.service';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';
import { OrderResponse } from '../../../core/models/Order';

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.css'
})
export class DetailOrderComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  orderId = 0;
  order: OrderResponse = {
    orderId: 0,
    customerId: 0,
    customerName: '',
    employeeId: 0,
    employeeName: '',
    odertDate: '',
    store:{
      storeId: 0,
      storeName: '',
      address: ''
    },
    status: '',
    orderType: '',
    dateExport: new Date(),
    orderPendingId: 0,
    listProductOrder: []
  };

  totalPrice = 0;
  totalDiscountPrice = 0;
  totalPay = 0

  constructor(
      private productService: ProductsService,
      private orderService: OrderService,
      private toast: ToastService
    ) {
      this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
      this.getOrder()
      
    }

    getOrder(){
      this.orderService.getOrderById(this.orderId).subscribe(
        {
          next: (response) =>{
            this.order = response;
            this.countPrice()
          },
          error: (error) => {
            const errorMessage = error?.error?.message || error?.message || 'Đã xảy ra lỗi không xác định';
            this.toast.showToastError(errorMessage, 'Lỗi');
          }

        }
      )
    }

  countPrice(){
    for (const item of this.order.listProductOrder) {
      const quantity = item.amount;
      const originalPrice = item.product.price;
  
      this.totalPrice += quantity * originalPrice;
      this.totalPay += quantity * item.untilPrice;
      this.totalDiscountPrice += this.totalPrice - this.totalPay;
    }
  }

}
