import axios, { AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token here if needed
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message: string | string[] }>) => {
    const msg = error.response?.data?.message;
    const message = Array.isArray(msg) ? msg[0] : msg || 'Something went wrong';
    if (error.response?.status !== 404) {
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
