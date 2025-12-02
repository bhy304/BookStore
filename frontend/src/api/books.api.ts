import { BaseAPI } from './https';
import type { BookDetail, Book } from '../models/book.model';
import type { Pagination } from '../models/pagination.model';

interface FetchBooksParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

class BooksAPI extends BaseAPI {
  async fetchBooks(params: FetchBooksParams): Promise<FetchBooksResponse> {
    return this.get<FetchBooksResponse>('/books', { params });
  }

  async fetchBook(bookId: string): Promise<BookDetail> {
    return this.get<BookDetail>(`/books/${bookId}`);
  }
}

export const booksAPI = new BooksAPI();
