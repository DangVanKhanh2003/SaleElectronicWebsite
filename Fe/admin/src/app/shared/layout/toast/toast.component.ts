// toast.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastData, ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit, OnDestroy {
  toastMessage = '';
  toastTitle = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'success';
  showToast = false;
  private toastSubscription!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService.toastState$.subscribe((toast: ToastData | null) => {
      if (toast) {
        this.toastMessage = toast.message;
        this.toastTitle = toast.title;
        this.toastType = toast.type;
        this.showToast = true;

        // Auto-hide toast after 3s
        setTimeout(() => this.showToast = false, 3000);
      }
    });
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
  }

  closeToast() {
    this.showToast = false;
  }

  getToastClass() {
    switch (this.toastType) {
      case 'success': return 'bg-success text-white';
      case 'error': return 'bg-danger text-white';
      case 'info': return 'bg-info text-white';
      case 'warning': return 'bg-warning text-dark';
      default: return 'bg-secondary text-white';
    }
  }
}
