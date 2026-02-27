import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="order-detail-container">
      <h1>Order Detail</h1>
      <p>Order detail functionality coming soon...</p>
    </div>
  `,
  styles: [`
    .order-detail-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class OrderDetailComponent { }
