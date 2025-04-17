import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsModalComponent } from '../order-details-modal/order-details-modal.component';

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
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, OrderDetailsModalComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [
    {
      id: 'ORD-5731',
      customer: 'John Smith',
      date: '2025-03-28',
      items: [
        { id: 1, image: 'https://via.placeholder.com/40', name: 'Smartphone X', price: 199.99, quantity: 1, total: 199.99 },
        { id: 2, image: 'https://via.placeholder.com/40', name: 'Protective Case', price: 24.99, quantity: 1, total: 24.99 },
        { id: 3, image: 'https://via.placeholder.com/40', name: 'Screen Protector', price: 10.49, quantity: 2, total: 20.98 }
      ],
      amount: 245.99,
      payment: 'Credit Card',
      status: 'success'
    },
    // Add more sample orders as needed
  ];

  filteredOrders: Order[] = [];
  searchTerm: string = '';
  paymentFilter: string = '';
  dateFrom: string = '';
  dateTo: string = '';
  activeTab: string = 'all';
  isModalActive = false;
  selectedOrder: Order | null = null;
  viewMode: 'details' | 'edit' | null = null;

  // Pagination
  page: number = 1;
  pageSize: number = 5;

  ngOnInit() {
    this.filteredOrders = [...this.orders];
  }

  filterOrders() {
    this.page = 1; // Reset to first page
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = this.searchTerm
        ? order.customer.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesPayment = this.paymentFilter
        ? order.payment.toLowerCase().includes(this.paymentFilter.toLowerCase())
        : true;

      const date = new Date(order.date);
      const from = this.dateFrom ? new Date(this.dateFrom) : null;
      const to = this.dateTo ? new Date(this.dateTo) : null;
      const matchesDate = (!from || date >= from) && (!to || date <= to);

      return matchesSearch && matchesPayment && matchesDate;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.paymentFilter = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.filteredOrders = [...this.orders];
    this.page = 1;
  }

  changeStatus(order: Order, newStatus: string) {
    order.status = newStatus;
    this.filterOrders();
  }

  getOrdersByStatus(status: string): Order[] {
    const byStatus = this.filteredOrders.filter(order => status === 'all' || order.status === status);
    return byStatus;
  }

  get paginatedOrders(): Order[] {
    const filtered = this.getOrdersByStatus(this.activeTab);
    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  // Modal handlers
  viewOrder(order: Order) {
    this.isModalActive = true
    this.selectedOrder = order;
    this.viewMode = 'details';
  }

  editOrder(order: Order) {
    this.selectedOrder = order;
    this.viewMode = 'edit';
  }

  deleteOrder(order: Order) {
    const confirmed = confirm(`Are you sure you want to delete Order ${order.id}?`);
    if (confirmed) {
      this.orders = this.orders.filter(o => o.id !== order.id);
      this.filterOrders();
    }
  }

  saveOrder(updatedOrder: Order) {
    const index = this.orders.findIndex(o => o.id === updatedOrder.id);
    if (index > -1) {
      this.orders[index] = updatedOrder;
    }
    this.selectedOrder = null;
    this.viewMode = null;
    this.filterOrders();
  }

  get totalPages(): number {
    return Math.ceil(this.getOrdersByStatus(this.activeTab).length / this.pageSize);
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
    }
  }

  closeModal(){
    this.isModalActive = false;
  }
}
