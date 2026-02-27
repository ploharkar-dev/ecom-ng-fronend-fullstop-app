import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { ProductsService, Product } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  
  // Pagination
  pageIndex = 0;
  pageSize = 12;
  totalElements = 0;

  // Filters
  searchQuery = '';
  minPrice = 0;
  maxPrice = 10000;
  selectedCategory = '';
  sortBy = 'relevance';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || params['search'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = null;

    if (this.searchQuery) {
      this.productService.searchProducts(this.searchQuery, this.pageIndex, this.pageSize).subscribe({
        next: (response) => {
          this.products = response.content;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load products';
          this.isLoading = false;
        }
      });
    } else {
      this.productService.getProducts(this.pageIndex, this.pageSize).subscribe({
        next: (response) => {
          this.products = response.content;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load products';
          this.isLoading = false;
        }
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onFilterChange(): void {
    this.pageIndex = 0;
    this.loadProducts();
  }

  onSortChange(): void {
    this.pageIndex = 0;
    this.loadProducts();
  }
}
