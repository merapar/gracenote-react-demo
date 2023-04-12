import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ErrorPage } from "../pages/ErrorPage";
import { LandingPage } from "../pages/LandingPage";
import { AboutPage } from "../pages/About";
import React from "react";

const URL_LANDING_PAGE = "/";
const URL_WHATS_ON_TV = "/whats-on-tv";
const URL_ABOUT = "/about";
export const routesConfig = [
  { title: "Movies in the Cinema", url: URL_LANDING_PAGE },
  { title: "Movies on TV", url: URL_WHATS_ON_TV },
  { title: "About", url: URL_ABOUT },
];
export const getRouteTitleByPath = (path: string) => {
  return routesConfig.find((value) => value.url === path)?.title;
};

export const routes = createBrowserRouter(
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
