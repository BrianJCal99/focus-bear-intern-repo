import axios from 'axios';
import axiosRetry, { exponentialDelay, isNetworkOrIdempotentRequestError } from 'axios-retry';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: exponentialDelay,
  retryCondition: isNetworkOrIdempotentRequestError,
});

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const fetchPosts = async (start: number, limit: number): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts', {
    params: { _start: start, _limit: limit },
  });
  return response.data;
};
