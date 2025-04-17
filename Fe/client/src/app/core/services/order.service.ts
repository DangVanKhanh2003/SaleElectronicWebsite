import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { OrderResponse } from '../models/Order';
import { api } from '../constants/api';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderByCustomer(idCustomer: number, type: string): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.apiUrl}${api.orderCustomer}/${idCustomer}?status=${type}`)
  }
  
  getOrderById(id: number): Observable<OrderResponse>{
    return this.http.get<OrderResponse>(`${this.apiUrl}${api.order}/${id}`)

  }
  
}
