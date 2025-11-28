import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBook } from '../hooks/useBook';

function BookDetail() {
  const { bookId } = useParams();
  const { book } = useBook(bookId);

  if (!book) return null; // early return

  console.log(book);

  return <BookDetailStyle>{book.title}</BookDetailStyle>;
}

const BookDetailStyle = styled.div``;

export default BookDetail;
