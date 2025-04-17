// import { Injectable } from '@angular/core';
// import { environment } from '../../../enviroment/environment';
// import { HttpClient } from '@angular/common/http';
// import { OrderResponse } from '../models/Order';
// import { api } from '../constants/api';
// import { map, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   getOrderByCustomer(idCustomer: number, type: string): Observable<OrderResponse[]> {
//     return this.http
//       .get<OrderResponse[]>(`${this.apiUrl}${api.orderCustomer}/${idCustomer}?status=${type}`)
//       .pipe(
//         map((result: OrderResponse[]) => {
//           return result.map(order => ({
//             ...order,
//             listProductOrder: order.listProductOrder.map((item) => ({
//               ...item,
//               mainImg: `data:image/png;base64,${item.product.mainImg}`,  // Biến đổi ảnh theo base64
//             }))
//           }));
//         })
//       );
//   }
  
  
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedOrderSubject = new BehaviorSubject<any>(null);
  selectedOrder$ = this.selectedOrderSubject.asObservable();

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    // In a real app, this would be an HTTP call
    return new Observable(observer => {
      observer.next([
        {
          id: '5731',
          orderId: '#ORD-5731',
          customer: 'John Smith',
          date: '2025-03-28',
          items: [
            { product: 'Smartphone X', price: '$199.99', quantity: 1, total: '$199.99', image: 'https://via.placeholder.com/40' },
            // Add other items
          ],
          amount: '$245.99',
          payment: 'Credit Card',
          status: 'Success'
        },
        // Add other sample orders
      ]);
    });
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    // Implement API call
    return this.http.put(`/api/orders/${orderId}/status`, { status });
  }

  deleteOrder(orderId: string): Observable<any> {
    // Implement API call
    return this.http.delete(`/api/orders/${orderId}`);
  }

  setSelectedOrder(order: any) {
    this.selectedOrderSubject.next(order);
  }
}