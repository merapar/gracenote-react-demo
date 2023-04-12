import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
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
import { ErrorPage } from "./pages/ErrorPage";
import { AboutPage } from "./pages/About";
import { LandingPage } from "./pages/LandingPage";
import { APIKeyPage } from "./pages/APIKeyPage";
import {
  ApiKeyContext,
  apiKey,
  setApiKey,
  resetApiKey,
} from "./store/api-key-context";

const emotionCache = createCache({
  key: "gracenote-cache",
  ...(process.env.NODE_ENV === "development" && { stylisPlugins: [] }),
});

const URL_LANDING_PAGE = "/";
const URL_WHATS_ON_TV = "/whats-on-tv";
const URL_ABOUT = "/about";
const URL_API_KEY_PAGE = "/api-key";

export const routesConfig = [
  { title: "Showings near you", url: URL_LANDING_PAGE },
  { title: "What's on TV", url: URL_WHATS_ON_TV },
  { title: "About", url: URL_ABOUT },
  { title: "API Key Page", url: URL_API_KEY_PAGE },
];

function RequireApiKey({ children }: { children: JSX.Element }) {
  const location = useLocation();

  const ApiKeyContextObj = useContext(ApiKeyContext);

  if (!ApiKeyContextObj.apiKey) {
    return (
      <Navigate to={URL_API_KEY_PAGE} state={{ from: location }} replace />
    );
  }

  return children;
}

const router = createBrowserRouter(
  [
    {
      element: <App />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: URL_LANDING_PAGE,
          element: (
            <RequireApiKey>
              <LandingPage />
            </RequireApiKey>
          ),
        },
        {
          path: URL_WHATS_ON_TV,
          element: <div>TV</div>,
        },
        {
          path: URL_ABOUT,
          element: <AboutPage />,
        },
        {
          path: URL_API_KEY_PAGE,
          element: <APIKeyPage />,
        },
      ],
    },
    { path: "test-path", element: <div>THIS IS A TEEST</div> },
  ],
  { basename: process.env.PUBLIC_URL }
);

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
