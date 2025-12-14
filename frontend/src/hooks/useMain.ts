import { useEffect, useState } from 'react';
import { reviewsAPI } from '@/api/review.api';
import { booksAPI } from '@/api/books.api';
import { bannerAPI } from '@/api/banner.api';
import type { Book, BookReviewItem } from '@/models/book.model';
import type { Banner } from '@/models/banner.model';

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

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

    booksAPI.fetchBestBooks().then((books) => {
      setBestBooks(books);
    });

    bannerAPI.fetchBanners().then((banners) => {
      setBanners(banners);
    });
  }, []);

  return { reviews, newBooks, bestBooks, banners };
};
