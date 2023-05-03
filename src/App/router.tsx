import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from '../App';
import { ErrorPage } from '../pages/ErrorPage';
import { MoviesInCinema } from '../pages/MoviesInCinema';
import { AboutPage } from '../pages/About';
import { RequireApiKey } from '../components/RequireApiKey';
import { APIKeyPage } from '../pages/APIKeyPage';
import { MoviesOnTv } from '../pages/MoviesOnTv';
import WithParamSelector from '../components/WithParamSelector';
import { ContenDetailsPage } from '../pages/ContentDetailsPage';
import { SportsOnTv } from '../pages/SportsOnTV';

const URL_MOVIES_IN_CINEMA = '/movies-in-cinema';
const URL_MOVIES_ON_TV = '/movies-on-tv';
const URL_SPORTS_ON_TV = '/sports-on-tv';
const URL_ABOUT = '/about';
export const URL_API_KEY_PAGE = '/api-key';
export const URL_CONTENT_DETAILS = '/content-details';

export const drawerRoutesConfig = [
  { title: 'Movies in the Cinema', url: URL_MOVIES_IN_CINEMA },
  { title: 'Movies on TV', url: URL_MOVIES_ON_TV },
  { title: 'Sports on TV', url: URL_SPORTS_ON_TV },
  { title: 'About', url: URL_ABOUT },
  { title: 'API Key Page', url: URL_API_KEY_PAGE },
];

const allRoutesConfig = [
  ...drawerRoutesConfig,
  { title: 'Content Details', url: URL_CONTENT_DETAILS },
];

export const getRouteTitleByPath = (path: string) => {
  return allRoutesConfig.find((value) => value.url === path)?.title;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to={URL_MOVIES_IN_CINEMA} replace />} />
      <Route element={<WithParamSelector />}>
        <Route
          path={URL_MOVIES_IN_CINEMA}
          element={
            <RequireApiKey>
              <MoviesInCinema />
            </RequireApiKey>
          }
        />
        <Route
          path={URL_MOVIES_ON_TV}
          element={
            <RequireApiKey>
              <MoviesOnTv />
            </RequireApiKey>
          }
        />
        <Route
          path={URL_SPORTS_ON_TV}
          element={
            <RequireApiKey>
              <SportsOnTv />
            </RequireApiKey>
          }
        />
      </Route>
      <Route path={URL_CONTENT_DETAILS} element={<ContenDetailsPage />} />
      <Route path={URL_ABOUT} element={<AboutPage />} />
      <Route path={URL_API_KEY_PAGE} element={<APIKeyPage />} />
    </Route>,
  ),
  {
    basename: process.env.PUBLIC_URL,
  },
);
