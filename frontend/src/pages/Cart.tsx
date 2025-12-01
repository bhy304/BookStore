import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { useAlert } from '../hooks/useAlert';
import { FaShoppingCart } from 'react-icons/fa';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import Empty from '../components/common/Empty';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import type { OrderSheet } from '../models/order.model';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();

  const { showAlert, showConfirm } = useAlert();
  const { carts, isEmpty, deleteCartItem } = useCart();

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택해 주세요.');
      return;
    }

    const orderData: Omit<OrderSheet, 'delivery'> = {
      items: checkedItems,
      totalQuantity,
      totalPrice,
      mainBookTitle: carts[0].title,
    };

    showConfirm('주문하시겠습니까?', () => {
      navigate('/order', { state: orderData });
    });
  };

  return (
    <>
      <Title size='large'>장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className='content'>
              {carts.map((cart) => (
                <CartItem
                  key={cart.id}
                  cart={cart}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>
            <div className='summary'>
              <CartSummary
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
              />
              <Button size='large' scheme='primary' onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            icon={<FaShoppingCart />}
            title='장바구니가 비었습니다.'
            description={<>장바구니를 채워보세요.</>}
          />
        )}
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;

    h1 {
      padding: 0 0 24px 0;
    }

    .delivery {
      fieldset {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 8px;
        border: 0;
        margin: 0;
        padding: 0 0 12px 0;

        label {
          width: 80px;
        }

        .input {
          flex: 1;

          input {
            width: 100%;
          }
        }
      }
    }

    .error-text {
      color: red;
      margin: 0 0 0 88px;
      padding: 0 0 12px 0;
      text-align: left;
    }
  }
`;

export default Cart;
