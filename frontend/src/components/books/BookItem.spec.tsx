import { render } from '@testing-library/react';
import { BookStoreThemeProvider } from '../context/ThemeContext';
import BookItem from './BookItem';
import type { Book } from '../../models/book.model';

const dummyBook: Book = {
  id: 5,
  title: '어린왕자',
  img: 7,
  category_id: 0,
  form: '종이책',
  isbn: '0',
  summary: '사막여우',
  detail:
    '《어린 왕자》는 프랑스의 비행사이자 작가인 앙투안 드 생텍쥐페리가 1943년 발표한 중편 소설이다. 1943년에 미국에서 처음 출판되었고, 그 해 비시 프랑스 치하의 프랑스에서 비밀리에 출판되었다.',
  author: '앙투안 드 생텍쥐페리',
  pages: 100,
  contents: '목차',
  price: 20000,
  likes: 5,
  pubDate: '2025-10-15',
};

describe('BookItem Component Test', () => {
  it('Check Render', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>,
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText('20,000원')).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`,
    );
  });
});
