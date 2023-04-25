import axios, { AxiosInstance, RawAxiosRequestConfig } from 'axios';

let client: AxiosInstance;

export const initApi = (apiKey: string) => {
  client = axios.create({
    baseURL: 'https://data.tmsapi.com/v1.1',
    params: { api_key: apiKey },
  });
};

export const request = async <T>({ ...options }: RawAxiosRequestConfig) => {
  if (!client) {
    throw new Error('Api client not initialized');
  }
  return client<T>(options);
};

export const IMAGE_BASE_URL = 'https://demo.tmsimg.com/';
