import axios, { AxiosInstance, RawAxiosRequestConfig } from 'axios';

let client: AxiosInstance;

export const initApi = () => {
  client = axios.create({
    baseURL: 'http://data.tmsapi.com/v1.1',
    params: { api_key: process.env.REACT_APP_API_KEY as string }
  });
};

export const request = async <T>({ ...options }: RawAxiosRequestConfig) => {
  if (!client) {
    throw new Error('Api client not initialized');
  }
  return client<T>(options);
};
