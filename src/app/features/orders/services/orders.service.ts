import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface OrdersResponse {
  content: any[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private api: ApiService) { }

  getOrders(page: number = 0, size: number = 10): Observable<OrdersResponse> {
    return this.api.get<OrdersResponse>('/orders', { page, size });
  }

  getOrder(id: number): Observable<any> {
    return this.api.get<any>(`/orders/${id}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.api.put<any>(`/orders/${orderId}/status`, { status });
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.api.post<any>(`/orders/${orderId}/cancel`, {});
  }
}
