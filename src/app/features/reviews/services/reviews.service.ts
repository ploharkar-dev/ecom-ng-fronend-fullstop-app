import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  content: Review[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface AddReviewRequest {
  rating: number;
  title: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private api: ApiService) { }

  getProductReviews(productId: number, page: number = 0, size: number = 5): Observable<ReviewsResponse> {
    return this.api.get<ReviewsResponse>(`/reviews/product/${productId}`, { page, size });
  }

  getUserReviews(page: number = 0, size: number = 10): Observable<ReviewsResponse> {
    return this.api.get<ReviewsResponse>('/reviews/user', { page, size });
  }

  addReview(productId: number, review: AddReviewRequest): Observable<Review> {
    return this.api.post<Review>(`/reviews/${productId}`, review);
  }

  updateReview(reviewId: number, review: Partial<AddReviewRequest>): Observable<Review> {
    return this.api.put<Review>(`/reviews/${reviewId}`, review);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.api.delete<any>(`/reviews/${reviewId}`);
  }

  markHelpful(reviewId: number): Observable<any> {
    return this.api.post<any>(`/reviews/${reviewId}/helpful`, {});
  }
}
