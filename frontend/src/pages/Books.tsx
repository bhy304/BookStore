import { useCallback } from 'react';
import styled from 'styled-components';
import Title from '@/components/common/Title';
import BooksFilter from '@/components/books/BooksFilter';
import BooksList from '@/components/books/BooksList';
import BooksEmpty from '@/components/books/BooksEmpty';
import BooksViewSwitcher from '@/components/books/BooksViewSwitcher';
import Loading from '@/components/common/Loading';
import Button from '@/components/common/Button';
import { useBooksInifinite } from '@/hooks/useBooksInfinite';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function Books() {
  const { books, pagination, isEmpty, isBooksLoading, hasNextPage, fetchNextPage } =
    useBooksInifinite();

  const loadMore = useCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { threshold: 0.1 } // 요소가 10% 보여질 때 감지하도록 설정
  );

  if (isEmpty) {
    return <BooksEmpty />;
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        <div className='filter'>
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        {/* <Pagination pagination={pagination} /> */}
        <div className='more' ref={moreRef}>
          <Button
            size='medium'
            scheme='normal'
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}>
            {hasNextPage ? '더보기' : '마지막 페이지'}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  }
`;

export default Books;
