import { useEffect, useState } from 'react';
import { reviewsAPI } from '@/api/review.api';
import type { Book, BookReviewItem } from '@/models/book.model';
import { booksAPI } from '@/api/books.api';

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);

  useEffect(() => {
    reviewsAPI.fetchReviewAll().then((reviews) => {
      setReviews(reviews);
    });

    booksAPI
      .fetchBooks({
        category_id: undefined,
        news: true,
        currentPage: 1,
        limit: 4,
      })
      .then(({ books }) => {
        setNewBooks(books);
      });
  }, []);

  return { reviews, newBooks };
};
