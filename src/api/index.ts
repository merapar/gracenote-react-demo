import axios, { AxiosInstance, RawAxiosRequestConfig } from 'axios';

export const STORAGE_KEY_FOR_API_KEY = 'api-key';

export const getApiKey = () =>
  localStorage.getItem(STORAGE_KEY_FOR_API_KEY) ||
  process.env.REACT_APP_API_KEY ||
  '';

export const setApiKey = (key: string) => {
  localStorage.setItem(STORAGE_KEY_FOR_API_KEY, key);
};

let client: AxiosInstance;

export const initApi = (apiKey: string) => {
  client = axios.create({
    baseURL: 'https://data.tmsapi.com/v1.1',
    params: { api_key: apiKey },
  });
  console.log(`Api client initialized with key ${apiKey}`);
};

export const request = async <T>({ ...options }: RawAxiosRequestConfig) => {
  if (!client) {
    throw new Error('Api client not initialized');
  }
  return client<T>(options);
};

export const IMAGE_BASE_URL = 'https://demo.tmsimg.com/';
