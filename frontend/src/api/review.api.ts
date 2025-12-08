import { BaseAPI } from './https';
import type { BookReviewItem, BookReviewItemWrite } from '@/models/book.model';

interface AddBookReviewResponse {
  message: string;
}

class ReviewsAPI extends BaseAPI {
  async fetchBookReview(bookId: string): Promise<BookReviewItem[]> {
    return await this.get<BookReviewItem[]>(`/reviews/${bookId}`);
  }

  async addBookReview(bookId: string, data: BookReviewItemWrite) {
    return this.post<AddBookReviewResponse>(`/reviews/${bookId}`, data);
  }

  async fetchReviewAll(): Promise<BookReviewItem[]> {
    return await this.get<BookReviewItem[]>('/reviews');
  }
}

export const reviewsAPI = new ReviewsAPI();
