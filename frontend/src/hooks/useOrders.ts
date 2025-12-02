import { orderAPI } from '@/api/orders.api';
import { useEffect, useState } from 'react';
import type { OrderListItem } from '@/models/order.model';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    orderAPI.fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.find((order) => order.id === orderId)?.detail) {
      setSelectedItemId(orderId);
      return;
    }

    orderAPI.fetchOrder(orderId).then((orderDetail) => {
      setSelectedItemId(orderId);
      setOrders(
        orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, detail: orderDetail };
          }
          return order;
        })
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
