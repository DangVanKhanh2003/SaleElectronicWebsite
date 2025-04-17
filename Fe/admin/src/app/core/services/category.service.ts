import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryRequest, CategoryResponse } from '../models/Categories';
import { api } from '../constants/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.apiUrl}${api.category}`);
  }

  addCategory(category: CategoryRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}${api.category}`, category);
  }

  updateCategory(updatedCategory: CategoryRequest, categoryId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}${api.category}/${categoryId}`, updatedCategory);
  }

  deleteCategory(cateagoryId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${api.category}/${cateagoryId}`);

  }
}
