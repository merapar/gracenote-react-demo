import { useState, useMemo } from 'react';

import { MainContent } from '../components/MainContent';
import { Navigation } from '../components/Navigation';
import { useLocationSelector } from '../App';
import { useApiKey } from '../store/ApiKeyProvider';
import {
  GetMoviesShowingsQueryResponseType,
  useGetMoviesShowingsQuery,
} from '../api/useGetMoviesShowingsQuery';
import dayjs, { Dayjs } from 'dayjs';

interface FetchData {
  isLoading?: boolean;
  data?: GetMoviesShowingsQueryResponseType;
}

export const MoviesInCinema = () => {
  const { getApiKey } = useApiKey();

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
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
      <Navigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setZipCode={setZipCode}
        currentZipCode={currentZipCode}
      />

      <MainContent isLoading={isLoading} data={data} />
    </>
  );
};
