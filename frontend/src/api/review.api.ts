import { BaseAPI } from './https';
import type { BookReviewItem } from '@/models/book.model';

class ReviewsAPI extends BaseAPI {
  async fetchBookReview(bookId: string): Promise<BookReviewItem[]> {
    return this.get<BookReviewItem[]>(`/reviews/${bookId}`);
  }
}

export const reviewsAPI = new ReviewsAPI();
