import { BaseAPI } from './https';
import type { SignupProps } from '@/pages/Signup';
import type { ResetPasswordProps } from '@/pages/ResetPassword';
import type { LoginProps } from '@/pages/Login';

interface Response {
  token: string;
}

class AuthAPI extends BaseAPI {
  async signup(data: SignupProps): Promise<Response> {
    return this.post<Response>('/users/join', data);
  }

  async resetRequest(data: ResetPasswordProps): Promise<void> {
    return this.post<void>('/users/reset', {
      email: data.email,
    });
  }

  async resetPassword(data: ResetPasswordProps): Promise<void> {
    return this.put<void>('/users/reset', data);
  }

  async login(data: LoginProps): Promise<Response> {
    return this.post<Response>('/users/login', data);
  }
}

export const authAPI = new AuthAPI();
