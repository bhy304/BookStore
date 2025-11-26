import { httpClient } from './https';
import type { SignupProps } from '../pages/Signup';

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post('/users/join', userData);

  return response.data;
};
