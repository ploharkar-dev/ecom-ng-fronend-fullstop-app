import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatStepperModule],
  template: `
    <div class="checkout-container">
      <h1>Checkout</h1>
      <p>Checkout functionality coming soon...</p>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class CheckoutComponent { }
