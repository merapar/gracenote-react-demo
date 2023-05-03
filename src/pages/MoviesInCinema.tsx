import { ContentDashboard } from '../components/ContentDashboard';

import {
  MovieShowings,
  useGetMoviesShowingsQuery,
} from '../api/useGetMoviesShowingsQuery';
import {
  ContentItem,
  filterContentItemsPredicate,
} from '../components/ContentGallery';
import { useOutletContext } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

const movieShowingToContentItemMapper = ({
  tmsId,
  title,
  shortDescription,
  longDescription,
  preferredImage,
  showtimes,
}: MovieShowings): ContentItem => ({
  tmsId,
  title,
  shortDescription,
  longDescription,
  imageUri: preferredImage.uri,
  showtimes:
    showtimes?.map(({ dateTime, theatre }) => ({
      location: theatre.name,
      dateTime,
    })) ?? [],
});

export const MoviesInCinema = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const { data, isFetching } = useGetMoviesShowingsQuery({
    startDate: selectedDate?.format('YYYY-MM-DD') ?? '',
    zip: zipCode,
  });

  const items = useMemo(
    () =>
      data
        ?.map(movieShowingToContentItemMapper)
        .filter(filterContentItemsPredicate) ?? [],
    [data],
  );

  return <ContentDashboard isLoading={isFetching} contentItems={items} />;
};
