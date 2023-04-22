import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { ErrorPage } from '../pages/ErrorPage';
import { MoviesOnCinema } from '../pages/MoviesOnCinema';
import { AboutPage } from '../pages/About';
import { RequireApiKey } from '../components/RequireApiKey';
import { APIKeyPage } from '../pages/APIKeyPage';
import { MoviesOnTv } from '../pages/MoviesOnTv';

const URL_LANDING_PAGE = '/';
const URL_WHATS_ON_TV = '/whats-on-tv';
const URL_ABOUT = '/about';
export const URL_API_KEY_PAGE = '/api-key';

export const routesConfig = [
  { title: 'Movies in the Cinema', url: URL_LANDING_PAGE },
  { title: 'Movies on TV', url: URL_WHATS_ON_TV },
  { title: 'About', url: URL_ABOUT },
  { title: 'API Key Page', url: URL_API_KEY_PAGE },
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
          element: (
            <RequireApiKey>
              <MoviesOnCinema />
            </RequireApiKey>
          ),
        },
        {
          path: URL_WHATS_ON_TV,
          element: (
            <RequireApiKey>
              <MoviesOnTv />
            </RequireApiKey>
          ),
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
  ],
  { basename: process.env.PUBLIC_URL },
);
