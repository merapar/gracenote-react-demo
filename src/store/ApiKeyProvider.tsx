import { createContext, useContext } from 'react';

type ContextType = {
  getApiKey: () => string;
  onSetApiKey: (key: string) => void;
  onResetApiKey: () => void;
};
const getApiKeyHandler = () =>
  localStorage.getItem('api-key') || process.env.REACT_APP_API_KEY || '';
const setApiKeyHandler = (key: string) => localStorage.setItem('api-key', key);
const resetApiKeyHandler = () => localStorage.removeItem('api-key');

const ApiKeyContext = createContext<ContextType>({
  getApiKey: getApiKeyHandler,
  onSetApiKey: setApiKeyHandler,
  onResetApiKey: resetApiKeyHandler,
});

export const useApiKey = () => useContext(ApiKeyContext);

const ApiKeyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApiKeyContext.Provider
      value={{
        getApiKey: getApiKeyHandler,
        onSetApiKey: setApiKeyHandler,
        onResetApiKey: resetApiKeyHandler,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};

export default ApiKeyProvider;
