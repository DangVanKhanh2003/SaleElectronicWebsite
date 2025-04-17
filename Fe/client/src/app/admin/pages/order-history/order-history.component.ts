import { Component, OnInit } from '@angular/core';
import { OrderpendingService } from '../../../core/services/orderpending.service';
import { OrderPendingResponse } from '../../../core/models/OrderPending';
import { CommonModule } from '@angular/common';
import { StatusOrder } from '../../../core/enum';
import { OrderService } from '../../../core/services/order.service';
import { OrderResponse } from '../../../core/models/Order';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})


export class OrderHistoryComponent implements OnInit {

  statusOrder: Number = StatusOrder.Pending;
  orderPendingResponse: OrderPendingResponse[] = [];
  orderResponse: OrderResponse[] = [];
  StatusOrderEnum = StatusOrder; 

  constructor(
                private orderPending: OrderpendingService,
                private order: OrderService
  )
  {
  }
  ngOnInit(): void {
    
    this.resetData();
  }

  setStatus(status: StatusOrder) {
    this.statusOrder = status;
    this.resetData();
  }

  resetData()
  {
    this.orderResponse = [];
    this.orderPendingResponse = [];
    switch (this.statusOrder) {
      case StatusOrder.Pending:
         this.loadOrderPending();
        break;
      case StatusOrder.Approved:
        this.loadOrderApproved();
        break;
      case StatusOrder.Rejected:
        this.loadOrderRejected();
        break;
      case StatusOrder.Success:
        this.loadOrderSuccess();
        break;
        case StatusOrder.RejectedCustomer:
          this.loadOrderCusomerCancel();
          break;
    }
  }
  loadOrderPending()
  {
    this.orderPending.getOrderPendingByCustomer(1, "pending").subscribe(result => {
      this.orderPendingResponse = result
    })
  }

  loadOrderCusomerCancel()
  {
    this.orderPending.getOrderPendingByCustomer(1, "cancel").subscribe(result => {
      this.orderPendingResponse = result
    })
  }

  loadOrderSuccess()
  {
    this.order.getOrderByCustomer(1, "approve").subscribe(result => {
      this.orderResponse = result
    })
  }

  loadOrderRejected()
  {
    this.order.getOrderByCustomer(1, "cancel").subscribe(result => {
      this.orderResponse = result
      
    })
  }

  loadOrderApproved()
  {
    this.order.getOrderByCustomer(1, "pending").subscribe(result => {
      this.orderResponse = result
    })
  }

  
}
