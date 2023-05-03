import { ContentDashboard } from '../components/ContentDashboard';
import { useOutletContext } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import { useGetMoviesInCinema } from '../hooks/useMoviesInCinema';

export const MoviesInCinema = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const { contentItems, isLoading } = useGetMoviesInCinema({
    startDateTime: selectedDate,
    zipCode: zipCode,
  });

  return <ContentDashboard isLoading={isLoading} contentItems={contentItems} />;
};
