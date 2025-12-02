import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from '@/store/authStore';

const BASE_URL = 'http://localhost:8888';
const DEFAULT_TIMEOUT = 30000;

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // 로그인 만료 처리
      if (error.response?.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const httpClient = createClient();

export class BaseAPI {
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.get<T>(url, config);
    return response.data;
  }

  protected async post<T>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.post<T>(url, payload, config);
    return response.data;
  }

  protected async put<T>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.put<T>(url, payload, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.delete<T>(url, config);
    return response.data;
  }
}

// export const requestHandler = async <T>(
//   method: RequestMethod,
//   url: string,
//   payload?: T
// ) => {
//   let response;

//   switch (method) {
//     case 'post':
//       response = await httpClient.post(url, payload);
//       break;
//     case 'get':
//       response = await httpClient.get(url);
//       break;
//     case 'put':
//       response = await httpClient.put(url, payload);
//       break;
//     case 'delete':
//       response = await httpClient.delete(url);
//       break;
//     default:
//       break;
//   }

//   return response?.data;
// };
