import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <div class="wishlist-container">
      <h1>My Wishlist</h1>
      <p>Wishlist functionality coming soon...</p>
    </div>
  `,
  styles: [`
    .wishlist-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class WishlistComponent { }
