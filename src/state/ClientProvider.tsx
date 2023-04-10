import { ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initApi } from '../api';
import { AxiosError } from 'axios';
import { Alert, Snackbar } from '@mui/material';

const ClientProvider = ({ children }: { children: ReactNode }) => {


  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => { 
      initApi();
  }, []);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            onError: (err) => {
              if (
                err instanceof AxiosError &&
                (err.response?.status ?? 0) >= 400 &&
                (err.response?.status ?? 0) < 600
              ) {
                setErrorMessage(
                  `${err.message} (${err.response?.statusText} - ${err.config?.url})`,
                );
              }
            },
          },
        },
      }),
    [],
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => {
          setErrorMessage('');
        }}
      >
        <Alert
          onClose={() => {
            setErrorMessage('');
          }}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </QueryClientProvider>
  );
};

export default ClientProvider;
