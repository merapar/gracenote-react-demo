import { createContext, useState } from "react";

export const ApiKeyContext = createContext({
  apiKeyValue: "",
  onSetApiKey: (key: string) => {},
  onResetApiKey: () => {},
});

export const ApiKeyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [apiKey, setApiKey] = useState(
    process.env.REACT_APP_API_KEY || localStorage.getItem("api-key") || ""
  );

  const setApiKeyHandler = (key: string) => {
    localStorage.setItem("api-key", key);
    setApiKey(key);
  };

  const resetApiKeyHandler = () => {
    localStorage.removeItem("api-key");
    setApiKey("");
  };

  return (
    <ApiKeyContext.Provider
      value={{
        apiKeyValue: apiKey,
        onSetApiKey: setApiKeyHandler,
        onResetApiKey: resetApiKeyHandler,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};
