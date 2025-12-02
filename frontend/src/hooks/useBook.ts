import { cartsAPI } from './../api/carts.api';
import { useEffect, useState } from 'react';
import { booksAPI } from '@/api/books.api';
import { likesAPI } from '@/api/likes.api';
import type { BookDetail } from '@/models/book.model';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);

  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const likeToggle = () => {
    // 권한 확인
    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      return;
    }

    if (!book) return;

    if (book.liked) {
      likesAPI.unlikeBook(book.id).then(() => {
        setBook({ ...book, liked: false, likes: book.likes - 1 });
      });
    } else {
      likesAPI.likeBook(book.id).then(() => {
        setBook({ ...book, liked: true, likes: book.likes + 1 }); // 낙관적 업데이트 : 불필요한 요청 제거, 화면에 like 요소가 업데이트 되는 것은 book 정보에서 상대적으로 마이너한 정보이기 때문에 낙관적 업데이트로 처리하는 경우가 굉장히 많다.
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;

    cartsAPI
      .addCart({
        book_id: book.id,
        quantity: quantity,
      })
      .then(() => {
        setCartAdded(true);
        setTimeout(() => {
          setCartAdded(false);
        }, 3000);
      });
  };

  useEffect(() => {
    if (!bookId) return;

    booksAPI.fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded };
};
