import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import ClientProvider from "./state/ClientProvider";

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

export const routesConfig = [
  { title: "Showings near you", url: URL_LANDING_PAGE },
  { title: "What's on TV", url: URL_WHATS_ON_TV },
  { title: "About", url: URL_ABOUT },
];

const router = createBrowserRouter(
  [
    {
      element: <App />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: URL_LANDING_PAGE,
          element: <LandingPage />,
        },
        {
          path: URL_WHATS_ON_TV,
          element: <div>TV</div>,
        },
        {
          path: URL_ABOUT,
          element: <AboutPage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ClientProvider>
        <CssBaseline />
        <RouterProvider router={router} fallbackElement={<CircularProgress />} />
      </ClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
