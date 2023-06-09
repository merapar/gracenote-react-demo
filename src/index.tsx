import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import reportWebVitals from './reportWebVitals';

import './index.css';

import { theme } from './App/theme';
import { router } from './App/router';
import ClientProvider from './store/ClientProvider';

const emotionCache = createCache({
  key: 'gracenote-cache',
  ...(process.env.NODE_ENV === 'development' && { stylisPlugins: [] }),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ClientProvider>
            <RouterProvider
              router={router}
              fallbackElement={<CircularProgress />}
            />
            <ReactQueryDevtools />
          </ClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </LocalizationProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
