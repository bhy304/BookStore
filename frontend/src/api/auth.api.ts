import { httpClient } from './https';
import type { SignupProps } from '../pages/Signup';
import type { ResetPasswordProps } from '../pages/ResetPassword';

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post('/users/join', userData);

  return response.data;
};

export const resetRequest = async (data: ResetPasswordProps) => {
  const response = await httpClient.post('/users/reset', {
    email: data.email,
  });

  return response.data;
};

export const resetPassword = async (data: ResetPasswordProps) => {
  const response = await httpClient.put('/users/reset', data);

  return response.data;
};
