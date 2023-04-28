import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { ErrorPage } from '../pages/ErrorPage';
import { MoviesInCinema } from '../pages/MoviesInCinema';
import { AboutPage } from '../pages/About';
import { RequireApiKey } from '../components/RequireApiKey';
import { APIKeyPage } from '../pages/APIKeyPage';
import { MoviesOnTv } from '../pages/MoviesOnTv';
import WithParamSelector from '../components/WithParamSelector';

const URL_MOVIES_IN_CINEMA = '/movies-in-cinema';
const URL_MOVIES_ON_TV = '/movies-on-tv';
const URL_ABOUT = '/about';
export const URL_API_KEY_PAGE = '/api-key';

export const routesConfig = [
  { title: 'Movies in the Cinema', url: URL_MOVIES_IN_CINEMA },
  { title: 'Movies on TV', url: URL_MOVIES_ON_TV },
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
          index: true,
          element: <Navigate to={URL_MOVIES_IN_CINEMA} replace />,
        },
        {
          element: <WithParamSelector />,
          children: [
            {
              path: URL_MOVIES_IN_CINEMA,
              element: (
                <RequireApiKey>
                  <MoviesInCinema />
                </RequireApiKey>
              ),
            },
            {
              path: URL_MOVIES_ON_TV,
              element: (
                <RequireApiKey>
                  <MoviesOnTv />
                </RequireApiKey>
              ),
            },
          ],
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
