import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface CreateOrderRequest {
  shippingAddressId: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private api: ApiService) { }

  createOrder(orderData: CreateOrderRequest): Observable<Order> {
    return this.api.post<Order>('/orders', orderData);
  }

  validatePayment(paymentData: any): Observable<any> {
    return this.api.post<any>('/orders/validate-payment', paymentData);
  }

  confirmOrder(orderId: number): Observable<Order> {
    return this.api.post<Order>(`/orders/${orderId}/confirm`, {});
  }
}
