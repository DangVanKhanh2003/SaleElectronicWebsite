import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Categories';
import { api } from '../constants/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.apiUrl}${api.category}`);
  }
}
