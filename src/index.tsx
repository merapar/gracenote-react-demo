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

const emotionCache = createCache({
  key: "gracenote-cache",
  ...(process.env.NODE_ENV === "development" && { stylisPlugins: [] }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider
          router={routes}
          fallbackElement={<CircularProgress />}
        />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
