import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  isAuthenticated$!: Observable<boolean>;
  cartItemCount$!: Observable<number>;
  wishlistItemCount$!: Observable<number>;

  constructor(
    private auth: AuthService,
    private cart: CartService,
    private wishlist: WishlistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.cartItemCount$ = this.cart.getCartItemCount();
    this.wishlistItemCount$ = this.wishlist.getWishlistItemCount();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
      this.searchQuery = '';
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
