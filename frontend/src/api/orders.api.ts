import type { Order, OrderDetailItem, OrderSheet } from '../models/order.model';
import { httpClient } from './https';

export const order = async (orderData: OrderSheet) => {
  const response = await httpClient.post<Order>('/orders', orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<Order[]>('/orders');
  return response.data;
};

export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<OrderDetailItem[]>(
    `/orders/${orderId}`
  );
  return response.data;
};
