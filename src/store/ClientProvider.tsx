import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Alert, Snackbar } from '@mui/material';
import { AxiosError } from 'axios';

import { initApi } from '../api';

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState('');

  // instantiate axios
  initApi();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            onError: (error) => {
              if (
                error instanceof AxiosError &&
                (error.response?.status ?? 0) >= 400 &&
                (error.response?.status ?? 0) < 600
              ) {
                setErrorMessage(
                  `${error.message} (${error.response?.statusText} - ${error.config?.url})`,
                );
              }
            },
          },
        },
      }),
    [],
  );

  const handleClose = () => {
    setErrorMessage('');
  };

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert sx={{ width: '100%' }} severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </QueryClientProvider>
  );
};
