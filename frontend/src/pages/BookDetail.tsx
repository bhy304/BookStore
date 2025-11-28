import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBook } from '../hooks/useBook';
import { getImgSrc } from '../utils/image';
import Title from '../components/common/Title';
import type { BookDetail } from '../models/book.model';
import { formatDate, formatNumber } from '../utils/format';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'category_name',
    filter: (book: BookDetail) => (
      <Link to={`/books?category_id=${book.category_id}`}>
        {book.category_name}
      </Link>
    ),
  },
  { label: '포맷', key: 'form' },
  { label: '페이지', key: 'pages' },
  { label: 'ISBN', key: 'isbn' },
  {
    label: '출간일',
    key: 'pub_date',
    filter: (book: BookDetail) => {
      return formatDate(book.pub_date);
    },
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: BookDetail) => {
      return `${formatNumber(book.price)} 원`;
    },
  },
];

function BookDetail() {
  const { bookId } = useParams();
  const { book } = useBook(bookId);

  if (!book) return null; // early return

  console.log('book', book);

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>

          {bookInfoList.map(({ label, key, filter }) => (
            <dl key={label}>
              <dt>{label}</dt>
              <dd>{filter ? filter(book) : book[key as keyof BookDetail]}</dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="like">라이크</div>
          <div className="add-cart">장바구니</div>
        </div>
      </header>
      <div className="content"></div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }

        a {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }
`;

export default BookDetail;
