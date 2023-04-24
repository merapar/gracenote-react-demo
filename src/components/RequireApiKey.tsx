import { Navigate, useLocation } from 'react-router-dom';
import { useApiKey } from '../store/ApiKeyProvider';
import { URL_API_KEY_PAGE } from '../App/routes';

export function RequireApiKey({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const { getApiKey } = useApiKey();
  if (!getApiKey()) {
    return (
      <Navigate to={URL_API_KEY_PAGE} state={{ from: location }} replace />
    );
  }

  return children;
}
