import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { booksAPI } from '@/api/books.api';
import { QUERYSTRING } from '@/constants/querystring';
import { LIMIT } from '@/constants/pagination';

export const useBooksInifinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);

    const category_id = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;
    const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
    const limit = LIMIT;
    const currentPage = pageParam;

    return booksAPI.fetchBooks({
      category_id,
      news,
      currentPage,
      limit,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['books', location.search],
    queryFn: ({ pageParam }: { pageParam: number }) => getBooks({ pageParam }),
    initialPageParam: 1, // 무한 스크롤의 첫 번째 페이지 번호를 명시적으로 지정, TanStack Query v5부터는 필수 속성, 이전에는 pageParam = 1로 기본값을 설정했지만, 이제는 명시적으로 지정해야 함
    getNextPageParam: (lastPage) => {
      const isLastPage =
        Math.ceil(lastPage.pagination.totalCount / LIMIT) === lastPage.pagination.currentPage;

      return isLastPage ? null : lastPage.pagination.currentPage + 1;
    },
  });

  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
