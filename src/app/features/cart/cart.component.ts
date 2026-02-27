import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$!: Observable<any>;
  cartTotal$!: Observable<any>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.getCartTotal();
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe();
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateCartItem(itemId, quantity).subscribe();
  }

  clearCart(): void {
    if (confirm('Are you sure?')) {
      this.cartService.clearCart().subscribe();
    }
  }
}
