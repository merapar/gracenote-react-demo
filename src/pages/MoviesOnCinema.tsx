import { useContext, useMemo } from 'react';

import { MainContent } from '../components/MainContent';
import { Navigation } from '../components/Navigation';
import { useLocationSelector } from '../App';
import { useApiKey } from '../store/ApiKeyProvider';
import { AppDataContext } from '../store/AppDataContext';
import {
  GetMoviesShowingsQueryResponseType,
  useGetMoviesShowingsQuery,
} from '../api/useGetMoviesShowingsQuery';

interface FetchData {
  isLoading?: boolean;
  data?: GetMoviesShowingsQueryResponseType;
}

export const MoviesOnCinema = () => {
  const { getApiKey } = useApiKey();
  const { selectedDate } = useContext(AppDataContext);

  const {
    locationSelector: { currentZipCode, setZipCode },
  } = useLocationSelector();

  const queryString = useMemo(() => {
    return {
      startDate: selectedDate?.format('YYYY-MM-DD') ?? '',
      zip: currentZipCode,
      api_key: getApiKey(),
    };
  }, [selectedDate, currentZipCode, getApiKey]);

  const { isLoading, data }: FetchData = useGetMoviesShowingsQuery(queryString);

  return (
    <>
      <Navigation setZipCode={setZipCode} currentZipCode={currentZipCode} />

      <MainContent isLoading={isLoading} data={data} />
    </>
  );
};
