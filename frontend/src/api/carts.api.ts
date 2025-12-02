import type { Cart } from '../models/cart.model';
import { BaseAPI } from './https';

interface AddCartParams {
  book_id: number;
  quantity: number;
}

interface AddCartResponse {
  id: number;
  book_id: number;
  quantity: number;
}

class CartsAPI extends BaseAPI {
  async addCart(params: AddCartParams): Promise<AddCartResponse> {
    return this.post<AddCartResponse>('/carts', params);
  }

  async fetchCart(): Promise<Cart[]> {
    return this.get<Cart[]>('/carts');
  }

  async deleteCart(cartId: number): Promise<void> {
    return this.delete<void>(`/carts/${cartId}`);
  }
}

export const cartsAPI = new CartsAPI();
