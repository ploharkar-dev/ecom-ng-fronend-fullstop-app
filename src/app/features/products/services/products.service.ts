import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  categoryId: number;
  imageUrl: string;
  images?: string[];
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface ProductsResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  public selectedProduct$ = this.selectedProductSubject.asObservable();

  constructor(private api: ApiService) { }

  getProducts(page: number = 0, size: number = 12): Observable<ProductsResponse> {
    return this.api.get<ProductsResponse>('/products', { page, size });
  }

  getProduct(id: number): Observable<Product> {
    return this.api.get<Product>(`/products/${id}`)
      .pipe(
        tap(product => this.selectedProductSubject.next(product))
      );
  }

  searchProducts(query: string, page: number = 0, size: number = 12): Observable<ProductsResponse> {
    return this.api.get<ProductsResponse>('/products/search', { q: query, page, size });
  }

  filterProducts(filters: any, page: number = 0, size: number = 12): Observable<ProductsResponse> {
    const params = { ...filters, page, size };
    return this.api.get<ProductsResponse>('/products/filter', params);
  }

  getCategories(): Observable<Category[]> {
    return this.api.get<Category[]>('/categories');
  }

  getCategory(id: number): Observable<Category> {
    return this.api.get<Category>(`/categories/${id}`);
  }

  getProductsByCategory(categoryId: number, page: number = 0, size: number = 12): Observable<ProductsResponse> {
    return this.api.get<ProductsResponse>(`/products/category/${categoryId}`, { page, size });
  }

  setSelectedProduct(product: Product): void {
    this.selectedProductSubject.next(product);
  }
}
