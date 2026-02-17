import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../features/cart/services/cart.service';
import { WishlistService } from '../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<any>;
  cartItemCount$: Observable<number>;
  wishlistItemCount$: Observable<number>;
  searchQuery: string = '';

  constructor(
    private auth: AuthService,
    private cart: CartService,
    private wishlist: WishlistService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.currentUser$ = this.auth.currentUser$;
    this.cartItemCount$ = this.cart.getCartItemCount();
    this.wishlistItemCount$ = this.wishlist.getWishlistItemCount();
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { q: this.searchQuery } });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
