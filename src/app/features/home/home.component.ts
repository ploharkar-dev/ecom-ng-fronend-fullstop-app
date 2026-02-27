import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { ProductsService, Product } from '../products/services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  private loadFeaturedProducts(): void {
    this.products.getProducts(0, 6).subscribe({
      next: (response) => {
        this.featuredProducts = response.content;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load featured products';
        this.isLoading = false;
      }
    });
  }
}
