import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface OrderItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}
interface Order {
  id: string;
  customer: string;
  date: string;
  items: OrderItem[];
  amount: number;
  payment: string;
  status: string;
  expanded?: boolean; // For collapsing items
}

@Component({
  selector: 'app-order-details-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent  implements OnInit{
    @Input() selectedOrder!: Order; // Expecting parent to pass in the order
    @Input() active = true;
    @Output() close = new EventEmitter<void>();
  
    ngOnInit(): void {
      console.log(this.selectedOrder)
    }
    get subtotal(): number {
      return this.selectedOrder?.amount ?? 0;
    }
  
    get tax(): number {
      return this.subtotal * 0.08875;
    }
  
    get total(): number {
      return this.subtotal + this.tax;
    }
  
    onClose() {
      this.active = false;
      this.close.emit();
    }
  }
  
