import { useState } from 'react';

import { useLocationSelector } from '../App';
import { Navigation } from '../components/Navigation';

import { useGetLineupsQuery } from '../api/useGetLineupsQuery';
import {
  useGetMoviesAirings,
  GetMoviesAiringsQueryResponse,
} from '../api/useGetMoviesAiringsQuery';
import dayjs, { Dayjs } from 'dayjs';
import { MainContent, Show } from '../components/MainContent';

const movieToShowMapper = (movie: GetMoviesAiringsQueryResponse): Show => {
  const {
    program: {
      longDescription,
      preferredImage,
      shortDescription,
      title,
      tmsId,
    },
    startTime,
    station,
  } = movie;

  return {
    longDescription,
    preferredImage,
    shortDescription,
    showtimes: [
      {
        theatre: { id: '', name: station.callSign },
        dateTime: startTime,
      },
    ],
    title,
    tmsId,
  };
};

export const MoviesOnTv = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const {
    locationSelector: { currentZipCode, setZipCode },
  } = useLocationSelector();

  const startDateTime = selectedDate?.format('YYYY-MM-DDTHH:mm[Z]') ?? '';

  const { data: lineupData } = useGetLineupsQuery({
    startDateTime: startDateTime,
    postalCode: currentZipCode.toString(),
    country: 'USA',
  });

  // Just select the first lineup for current Zipcode
  const lineupId = lineupData?.[0].lineupId ?? '';

  const { data, isLoading } = useGetMoviesAirings({
    lineupId: lineupId,
    startDateTime: startDateTime,
  });

  return (
    <>
      <Navigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setZipCode={setZipCode}
        currentZipCode={currentZipCode}
      />
      <MainContent data={data?.map(movieToShowMapper)} isLoading={isLoading} />
    </>
  );
};
