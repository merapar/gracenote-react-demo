import { useState } from 'react';

import { MainContent } from '../components/MainContent';
import { Navigation } from '../components/Navigation';
import { useLocationSelector } from '../App';

import {
  MovieShowings,
  MovieShowTime,
  useGetMoviesShowingsQuery,
} from '../api/useGetMoviesShowingsQuery';
import dayjs, { Dayjs } from 'dayjs';
import { ContentItem, ShowTime } from '../components/ContentGallery';

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
  item.showtimes = showtimes.map(showTimeMapper);

  return item;
};

export const MoviesInCinema = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const {
    locationSelector: { currentZipCode, setZipCode },
  } = useLocationSelector();

  const { isLoading, data } = useGetMoviesShowingsQuery({
    startDate: selectedDate?.format('YYYY-MM-DD') ?? '',
    zip: currentZipCode,
  });

  return (
    <>
      <Navigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setZipCode={setZipCode}
        currentZipCode={currentZipCode}
      />

      <MainContent
        isLoading={isLoading}
        contentItems={data?.map(movieShowingToContentItemMapper)}
      />
    </>
  );
};
