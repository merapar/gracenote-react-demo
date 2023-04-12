import { createContext } from "react";

export let apiKey =
  process.env.REACT_APP_API_KEY || localStorage.getItem("api-key") || "";

export function setApiKey(key: string) {
  localStorage.setItem("api-key", key);
  apiKey = key;
}

export function resetApiKey() {
  localStorage.removeItem("api-key");
  apiKey = "";
}

export const getApiKeyContext = () =>
  createContext({
    apiKey,
    setApiKey,
    resetApiKey,
  });
