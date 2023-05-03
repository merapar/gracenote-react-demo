import { Dayjs } from 'dayjs';
import { MovieAirings } from '../api/useGetMoviesAiringsQuery';
import { ContentDashboard } from '../components/ContentDashboard';
import {
  ContentItem,
  filterContentItemsPredicate,
} from '../components/ContentGallery';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { useGetMoviesOnTV } from '../hooks/useGetMoviesOnTV';

const movieAiringToContentItemMapper = ({
  program,
  startTime,
  station,
}: MovieAirings): ContentItem => {
  const { longDescription, preferredImage, shortDescription, title, tmsId } =
    program;

  return {
    longDescription,
    imageUri: preferredImage.uri,
    shortDescription,
    showtimes: [
      {
        location: station.callSign,
        dateTime: startTime,
      },
    ],
    title,
    tmsId,
  };
};

export const MoviesOnTv = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const { data, isFetching } = useGetMoviesOnTV({
    zip: zipCode,
    startDateTime: selectedDate,
  });

  const items = useMemo(
    () =>
      data
        ?.map(movieAiringToContentItemMapper)
        .filter(filterContentItemsPredicate) ?? [],
    [data],
  );

  return <ContentDashboard isLoading={isFetching} contentItems={items} />;
};
