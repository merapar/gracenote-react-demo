import { Navigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { ApiKeyContext } from "../store/api-key-context";
import { URL_API_KEY_PAGE } from "../App/routes";

export function RequireApiKey({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const ApiKeyContextObj = useContext(ApiKeyContext);

  if (!ApiKeyContextObj.apiKey) {
    return (
      <Navigate to={URL_API_KEY_PAGE} state={{ from: location }} replace />
    );
  }

  return children;
}
