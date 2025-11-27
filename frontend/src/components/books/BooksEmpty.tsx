import styled from 'styled-components';

interface Props {}

function BooksEmpty(props: Props) {
  return (
    <BooksEmptyStyle>
      <h1>BooksEmpty</h1>
    </BooksEmptyStyle>
  );
}

const BooksEmptyStyle = styled.div``;

export default BooksEmpty;
