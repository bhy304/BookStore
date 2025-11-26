import { httpClient } from './https';
import type { Category } from '../models/category.model';

export const fetchCategory = async () => {
  const response = await httpClient.get<Category[]>('/category');

  return response.data;
};
