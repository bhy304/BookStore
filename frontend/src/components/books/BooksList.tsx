import styled from 'styled-components';
import BookItem from './BookItem';
import type { Book } from '../../models/book.model';

interface Props {
  books: Book[];
}

function BooksList({ books }: Props) {
  return (
    <BooksListStyle>
      {books?.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </BooksListStyle>
  );
}

const BooksListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;

export default BooksList;
