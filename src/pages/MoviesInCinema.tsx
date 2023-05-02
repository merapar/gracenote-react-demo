import { ContentDashboard } from '../components/ContentDashboard';

import {
  MovieShowings,
  MovieShowTime,
  useGetMoviesShowingsQuery,
} from '../api/useGetMoviesShowingsQuery';
import { ContentItem, ShowTime } from '../components/ContentGallery';
import { useOutletContext } from 'react-router-dom';
import { Dayjs } from 'dayjs';

const showTimeMapper = (showtime: MovieShowTime): ShowTime => {
  const { dateTime, theatre: theatre } = showtime;

  return {
    location: theatre.name,
    dateTime,
  };
};

const movieShowingToContentItemMapper = (
  movieShowing: MovieShowings,
): ContentItem => {
  const {
    tmsId,
    title,
    shortDescription,
    longDescription,
    preferredImage,
    showtimes: showtimes,
  } = movieShowing;

  const item: ContentItem = {
    tmsId,
    title,
    shortDescription,
    longDescription,
    imageUri: preferredImage.uri,
    showtimes: [],
  };
  item.showtimes = showtimes?.map(showTimeMapper);

  return item;
};

export const MoviesInCinema = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const { isLoading, data } = useGetMoviesShowingsQuery({
    startDate: selectedDate?.format('YYYY-MM-DD') ?? '',
    zip: zipCode,
  });

  return (
    <>
      <ContentDashboard
        isLoading={isLoading}
        contentItems={
          data?.length ? data?.map(movieShowingToContentItemMapper) : []
        }
      />
    </>
  );
};
