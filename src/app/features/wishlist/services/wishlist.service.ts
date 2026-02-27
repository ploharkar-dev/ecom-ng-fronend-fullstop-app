import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../../products/services/products.service';

export interface WishlistItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  addedAt: string;
}

export interface Wishlist {
  id: number;
  userId: number;
  items: WishlistItem[];
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Wishlist | null>(null);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private api: ApiService) {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    this.api.get<Wishlist>('/wishlist').subscribe(
      wishlist => this.wishlistSubject.next(wishlist),
      error => console.log('Wishlist not found or not authenticated')
    );
  }

  getWishlist(): Observable<Wishlist> {
    return this.api.get<Wishlist>('/wishlist')
      .pipe(
        tap(wishlist => this.wishlistSubject.next(wishlist))
      );
  }

  addToWishlist(productId: number): Observable<Wishlist> {
    return this.api.post<Wishlist>(`/wishlist/items/${productId}`, {})
      .pipe(
        tap(wishlist => this.wishlistSubject.next(wishlist))
      );
  }

  removeFromWishlist(productId: number): Observable<Wishlist> {
    return this.api.delete<Wishlist>(`/wishlist/items/${productId}`)
      .pipe(
        tap(wishlist => this.wishlistSubject.next(wishlist))
      );
  }

  isProductInWishlist(productId: number): Observable<boolean> {
    return this.wishlist$.pipe(
      map(wishlist => {
        if (!wishlist) return false;
        return wishlist.items.some(item => item.productId === productId);
      })
    );
  }

  getWishlistItemCount(): Observable<number> {
    return this.wishlist$.pipe(
      map(wishlist => wishlist ? wishlist.items.length : 0)
    );
  }
}
