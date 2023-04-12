import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { CircularProgress, ThemeProvider } from "@mui/material";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import { theme } from "./App/theme";
import { routes } from "./App/routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  apiKey,
  getApiKeyContext,
  resetApiKey,
  setApiKey,
} from "./store/api-key-context";

const emotionCache = createCache({
  key: "gracenote-cache",
  ...(process.env.NODE_ENV === "development" && { stylisPlugins: [] }),
});

const ApiKeyContext = getApiKeyContext();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApiKeyContext.Provider
            value={{
              apiKey,
              setApiKey,
              resetApiKey,
            }}
          >
            <RouterProvider
              router={routes}
              fallbackElement={<CircularProgress />}
            />
          </ApiKeyContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
