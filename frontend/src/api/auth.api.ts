import { httpClient } from './https';
import type { SignupProps } from '../pages/Signup';
import type { ResetPasswordProps } from '../pages/ResetPassword';
import type { LoginProps } from '../pages/Login';

interface LoginResponse {
  token: string;
}

export const signup = async (data: SignupProps) => {
  const response = await httpClient.post('/users/join', data);

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

export const login = async (data: LoginProps) => {
  const response = await httpClient.post<LoginResponse>('/users/login', data);

  return response.data;
};
