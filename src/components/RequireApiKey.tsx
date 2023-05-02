import { Navigate, useLocation } from 'react-router-dom';
import { URL_API_KEY_PAGE } from '../App/router';
import { getApiKey } from '../api';
export function RequireApiKey({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (!getApiKey()) {
    return (
      <Navigate to={URL_API_KEY_PAGE} state={{ from: location }} replace />
    );
  }

  return children;
}
