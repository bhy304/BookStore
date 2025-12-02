import type { AxiosRequestConfig } from 'axios';
import { BaseAPI } from './https';
import type { Order, OrderDetailItem, OrderSheet } from '../models/order.model';

class OrderAPI extends BaseAPI {
  async order(orderData: OrderSheet): Promise<OrderSheet> {
    return this.post<OrderSheet>('/orders', orderData);
  }

  async fetchOrders(config?: AxiosRequestConfig): Promise<Order[]> {
    return this.get<Order[]>('/orders', config);
  }

  async fetchOrder(orderId: number): Promise<OrderDetailItem[]> {
    return this.get<OrderDetailItem[]>(`/orders/${orderId}`);
  }
}

export const orderAPI = new OrderAPI();
