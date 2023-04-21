import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ApiKeyContext } from '../store/ApiKeyContext';
import { URL_API_KEY_PAGE } from '../App/routes';

export function RequireApiKey({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const { apiKeyValue } = useContext(ApiKeyContext);
  if (!apiKeyValue) {
    return (
      <Navigate to={URL_API_KEY_PAGE} state={{ from: location }} replace />
    );
  }

  return children;
}
