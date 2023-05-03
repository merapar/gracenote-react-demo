import { Dayjs } from 'dayjs';
import {
  MovieShowings,
  useGetMoviesShowingsQuery,
} from '../api/useGetMoviesShowingsQuery';
import { useMemo } from 'react';
import {
  ContentItem,
  filterContentItemsPredicate,
} from '../components/ContentGallery';

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

export const useGetMoviesInCinema = ({
  startDateTime,
  zipCode,
}: {
  startDateTime: Dayjs;
  zipCode: number;
}) => {
  const { data, isLoading } = useGetMoviesShowingsQuery({
    startDate: startDateTime?.format('YYYY-MM-DD') ?? '',
    zip: zipCode,
  });

  const contentItems = useMemo(
    () =>
      data
        ?.map(movieShowingToContentItemMapper)
        .filter(filterContentItemsPredicate) ?? [],
    [data],
  );
  return { contentItems, isLoading };
};
