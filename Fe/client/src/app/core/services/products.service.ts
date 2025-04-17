import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../enviroment/environment';
import { api } from '../constants/api';
import { Product, ProductImg, Specifiaction} from '../models/Product';
import { ColorResponse } from '../models/Color';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getAllProduct(sortBy: string = 'null'): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}${api.product}?sortBy=${sortBy}`)
  }

  getAllProductHaveDiscoutn(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}${api.productDiscont}`)
  }

  getProductByIdCategory(id: number, sortBy: string = 'null'): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}${api.productByCategory}/${id}?sortBy=${sortBy}`)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${api.product}/${id}`)
  }

  getSpecificationByProductId(id: number): Observable<Specifiaction[]> {
    return this.http.get<Specifiaction[]>(`${this.apiUrl}${api.product}/${id}/Specification`);
  }

  getImagesByProductId(id: number): Observable<ProductImg[]> {
    return this.http.get<ProductImg[]>(`${this.apiUrl}${api.product}/${id}/Image`)
  }
  
  getColorByIdProduct(id: number): Observable<ColorResponse[]> {
    return this.http.get<ColorResponse[]>(`${this.apiUrl}${api.product}/${id}/color`)
  }
}
