import { BaseAPI } from './https';
import type { Category } from '../models/category.model';

class CategoryAPI extends BaseAPI {
  async fetchCategory(): Promise<Category[]> {
    return this.get<Category[]>('/category');
  }
}

export const categoryAPI = new CategoryAPI();
