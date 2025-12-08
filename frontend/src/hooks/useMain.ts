import { useEffect, useState } from 'react';
import { reviewsAPI } from '@/api/review.api';
import type { BookReviewItem } from '@/models/book.model';

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);

  useEffect(() => {
    reviewsAPI.fetchReviewAll().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return { reviews };
};
