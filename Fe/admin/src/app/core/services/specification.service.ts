import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../constants/api';
import { environment } from '../../../enviroment/environment';
import { SpecificationRequest } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {
  apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  addSpecification(idProduct: number, listSpe: SpecificationRequest[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${api.product}/${idProduct}/Specification`, listSpe);
  }
  
  editSpecification(idProduct: number, listSpe: SpecificationRequest[]){
    return this.http.post<any>(`${this.apiUrl}${api.product}/${idProduct}/Specification`, listSpe);
  }
}
