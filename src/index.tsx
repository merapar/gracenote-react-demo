import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./index.css";
import { ErrorPage } from "./pages/ErrorPage";
import { AboutPage } from "./pages/About";
import { LandingPage } from "./pages/LandingPage";
import { APIKeyPage } from "./pages/APIKeyPage";
import {
  getApiKeyContext,
  apiKey,
  setApiKey,
  resetApiKey,
} from "./store/api-key-context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4485A8", //TODO investigate why can't use var(--brand....)
    },
    secondary: {
      main: "#EC6434",
    },
    background: {
      default: "var(--brand-color-45)",
    },
  },
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

  const ApiKeyContextObj = useContext(getApiKeyContext());

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

const ApiKeyContext = getApiKeyContext();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
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
          router={router}
          fallbackElement={<CircularProgress />}
        />
      </ApiKeyContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
