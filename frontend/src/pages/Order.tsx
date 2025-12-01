import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}

function Order(props: Props) {
  const location = useLocation();
  const orderDataFromCart = location.state;
  console.log(orderDataFromCart);

  return <OrderStyle></OrderStyle>;
}

const OrderStyle = styled.div``;

export default Order;
