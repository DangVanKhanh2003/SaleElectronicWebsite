import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { ItemShoppingCart, ShoppingCart } from '../models/ShoppingCart';
import { map, Observable } from 'rxjs';
import { api } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getShoppingCartByIdCustomer(idCustomer: number): Observable<ItemShoppingCart[]> {
      return this.http.get<ItemShoppingCart[]>(`${this.apiUrl}${api.shoppingCart}?idCustomer=${idCustomer}`).pipe(
          map(result =>
            result.map(item => ({
              ...item,
              mainImg: `data:${null};base64,${item.mainImg}` // Corrected assignment
            }))
          )
        );
    }
  

  addShoppingCartItem(item: ShoppingCart): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${api.shoppingCart}`, item);
  }

  EditShoppingCartItem(idShoppingCart: number, amount: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${api.shoppingCart}/${idShoppingCart}?amount=${amount}`,null);
  }

  deleteItem(idShoppingCart: number)
  {
    return this.http.delete<any>(`${this.apiUrl}${api.shoppingCart}/${idShoppingCart}`);
  }
  
}
