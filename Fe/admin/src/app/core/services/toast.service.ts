import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastData | null>(null);
  toastState$ = this.toastSubject.asObservable();

  showToast(toast: ToastData) {
    this.toastSubject.next(toast);
  }

  showToastSuccess(message: string, title: string = 'Success') {
    this.showToast({ title, message, type: 'success' });
  }

  showToastError(message: string, title: string = 'Error') {
    this.showToast({ title, message, type: 'error' });
  }

  showToastInfo(message: string, title: string = 'Info') {
    this.showToast({ title, message, type: 'info' });
  }

  showToastWarning(message: string, title: string = 'Warning') {
    this.showToast({ title, message, type: 'warning' });
  }
}
