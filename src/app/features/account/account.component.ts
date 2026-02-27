import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="account-container">
      <h1>My Account</h1>
      <p>Account functionality coming soon...</p>
    </div>
  `,
  styles: [`
    .account-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class AccountComponent { }
