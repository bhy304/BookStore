import type { BookDetail, Book } from '../models/book.model';
import type { Pagination } from '../models/pagination.model';
import { httpClient } from './https';

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

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params,
    });

    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

  return response.data;
};
