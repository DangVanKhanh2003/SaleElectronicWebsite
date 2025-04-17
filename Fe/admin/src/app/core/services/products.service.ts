import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../enviroment/environment';
import { api } from '../constants/api';
import { Product, ProductImg, productRequest, SpecifiactionResponse} from '../models/Product';
import { CategoryResponse } from '../models/Categories';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}${api.product}`)
  }

  getProductByIdCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}${api.productByCategory}/${id}`)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${api.product}/${id}`)
  }

  getSpecificationByProductId(id: number): Observable<SpecifiactionResponse[]> {
    return this.http.get<SpecifiactionResponse[]>(`${this.apiUrl}${api.product}/${id}/Specification`);
  }

  getImagesByProductId(id: number): Observable<ProductImg[]> {
    return this.http.get<ProductImg[]>(`${this.apiUrl}${api.product}/${id}/Image`)
  }
  
  // Add methods for CRUD operations
  addProduct(product: productRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}${api.product}`, product);
  }

  updateProduct(product: productRequest, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}${api.product}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${api.product}/${id}`);
  }

  // Since the previous implementation had a method to get categories, we'll add a placeholder
  // You may need to adjust this based on your actual API
  getCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.apiUrl}${api.categories}`);
  }
  
}
