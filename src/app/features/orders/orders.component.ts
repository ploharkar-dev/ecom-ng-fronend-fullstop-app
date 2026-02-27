import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  template: `
    <div class="orders-container">
      <h1>My Orders</h1>
      <p>Orders functionality coming soon...</p>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class OrdersComponent { }
