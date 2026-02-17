import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private api: ApiService) {
    this.loadCart();
  }

  private loadCart(): void {
    this.api.get<Cart>('/cart').subscribe(
      cart => this.cartSubject.next(cart),
      error => console.log('Cart not found or not authenticated')
    );
  }

  getCart(): Observable<Cart> {
    return this.api.get<Cart>('/cart')
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  addToCart(productId: number, quantity: number = 1): Observable<Cart> {
    return this.api.post<Cart>('/cart/items', { productId, quantity })
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<Cart> {
    return this.api.put<Cart>(`/cart/items/${cartItemId}`, { quantity })
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  removeFromCart(cartItemId: number): Observable<Cart> {
    return this.api.delete<Cart>(`/cart/items/${cartItemId}`)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }

  clearCart(): Observable<any> {
    return this.api.delete<any>('/cart')
      .pipe(
        tap(() => this.cartSubject.next(null))
      );
  }

  getCartTotal(): Observable<number> {
    return this.cart$.pipe(
      map(cart => cart ? cart.total : 0)
    );
  }

  getCartItemCount(): Observable<number> {
    return this.cart$.pipe(
      map(cart => cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0)
    );
  }
}
