import { Injectable } from '@angular/core';
import { ColorResponse } from '../models/Color';
import { api } from '../constants/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllColor(): Observable<ColorResponse[]> {
    return this.http.get<ColorResponse[]>(`${this.apiUrl}${api.category}`);
  }

}
