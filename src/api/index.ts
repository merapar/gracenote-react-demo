import axios, { AxiosInstance, RawAxiosRequestConfig } from "axios";

let client: AxiosInstance;

export const initApi = () => {
  client = axios.create({
    baseURL: 'https://data.tmsapi.com/v1.1',
  });
};
export const request = async <T>({ ...options }: RawAxiosRequestConfig) => {
  if (!client) {
    throw new Error("Api client not initialized");
  }
  return client<T>(options);
};

export const IMAGE_BASE_URL = "https://demo.tmsimg.com/";
