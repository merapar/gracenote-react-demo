import { Dayjs } from 'dayjs';
import { ContentDashboard } from '../components/ContentDashboard';
import { useOutletContext } from 'react-router-dom';
import { useGetMoviesOnTv } from '../hooks/useGetMoviesOnTv';

export const MoviesOnTv = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const { contentItems, isLoading } = useGetMoviesOnTv({
    zip: zipCode,
    startDateTime: selectedDate,
  });

  return <ContentDashboard isLoading={isLoading} contentItems={contentItems} />;
};
