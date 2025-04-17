import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { ListProductOrederPendingResponse, OrderPendingRequest, OrderPendingResponse } from '../models/OrderPending';
import { map, Observable } from 'rxjs';
import { api } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class OrderpendingService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addOrderPending(item: OrderPendingRequest): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}${api.orderPending}`, item);
  }


  getOrderPendingByCustomer(idCustomer: number, status: string): Observable<OrderPendingResponse[]> {
    return this.http.get<OrderPendingResponse[]>(`${this.apiUrl}${api.orderPendingCustomer}/${idCustomer}?status=${status}`)
  }

  getOrderPendingById(id: number): Observable<OrderPendingResponse> {
    return this.http.get<OrderPendingResponse>(`${this.apiUrl}${api.orderPending}/${id}`)
  }
  
}
