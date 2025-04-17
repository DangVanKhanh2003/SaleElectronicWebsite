import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../enviroment/environment';
import { api } from '../constants/api';
import { Sale } from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}${api.sale}`);
  }

  getSaleByProductId(productId: number): Observable<Sale | null> {
    return this.http.get<Sale>(`${this.apiUrl}${api.sale}/product/${productId}`).pipe(
      tap(sale => sale, () => null)
    );
  }

  addSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}${api.sale}`, sale);
  }

  updateSale(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}${api.sale}/${sale.saleId}`, sale);
  }

  removeSale(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${api.sale}/product/${productId}`);
  }
}