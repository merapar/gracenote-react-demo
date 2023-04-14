import axios, { AxiosInstance, RawAxiosRequestConfig } from "axios";

let client: AxiosInstance;

export const initApi = () => {
  client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
};
export const request = async <T>({ ...options }: RawAxiosRequestConfig) => {
  if (!client) {
    throw new Error("Api client not initialized");
  }
  return client<T>(options);
};
