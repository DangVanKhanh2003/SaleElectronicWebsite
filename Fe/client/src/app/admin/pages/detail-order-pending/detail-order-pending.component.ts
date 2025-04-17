import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderPendingResponse } from '../../../core/models/OrderPending';
import { OrderpendingService } from '../../../core/services/orderpending.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-order-pending',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detail-order-pending.component.html',
  styleUrl: './detail-order-pending.component.css'
})
export class DetailOrderPendingComponent {
route: ActivatedRoute = inject(ActivatedRoute);
  orderPeindingId = 0;
  order: OrderPendingResponse ={
    orderPendingId: 0,
    customerName: '',
    customerId: 0,
    employeeId: 0,
    employeeName: '',
    odertDate: '',
    status: '',
    listProductOrederPending: []
  };

  totalPrice = 0;
  totalDiscountPrice = 0;
  totalPay = 0

  constructor(
      private orderPedingService: OrderpendingService,
      private toast: ToastService
    ) {
      this.orderPeindingId = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
      this.getOrder()
      
    }

    getOrder(){
      this.orderPedingService.getOrderPendingById(this.orderPeindingId).subscribe(
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
    for (const item of this.order.listProductOrederPending) {
      const quantity = item.amount;
      const originalPrice = item.price;
      const discount = item.sale?.percentSale ?? 0;
  
      this.totalPrice += quantity * originalPrice;
      this.totalPay += this.totalPrice - this.totalDiscountPrice;
      this.totalDiscountPrice += this.totalPrice * (100 - discount);
    }
  }
}
