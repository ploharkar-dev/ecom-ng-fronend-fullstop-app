import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { ProductsService, Product } from '../../services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import { ReviewsService, Review } from '../../../reviews/services/reviews.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  quantity = 1;
  reviews: Review[] = [];
  reviewsLoading = false;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private reviewService: ReviewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
      this.loadReviews(id);
    });
  }

  private loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Product not found';
        this.isLoading = false;
      }
    });
  }

  private loadReviews(id: number): void {
    this.reviewsLoading = true;
    this.reviewService.getProductReviews(id, 0, 5).subscribe({
      next: (response) => {
        this.reviews = response.content;
        this.reviewsLoading = false;
      },
      error: () => {
        this.reviewsLoading = false;
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity).subscribe({
        next: () => {
          alert('Product added to cart!');
          this.quantity = 1;
        },
        error: () => {
          alert('Failed to add to cart');
        }
      });
    }
  }

  addToWishlist(): void {
    alert('Added to wishlist!');
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
