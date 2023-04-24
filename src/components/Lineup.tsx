import { useContext, useMemo } from 'react';

import { GetLineupsQueryResponse } from '../api/useGetLineupsQuery';
import {
  GetMoviesAiringsQueryResponse,
  useGetMoviesOnTvQuery,
} from '../api/useGetMoviesAiringsQuery';
import { MainContent, Show } from './MainContent';
import { useApiKey } from '../store/ApiKeyProvider';
import { AppDataContext } from '../store/AppDataContext';

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

export const Lineup = ({ lineup }: { lineup: GetLineupsQueryResponse }) => {
  const { getApiKey } = useApiKey();
  const { selectedDate } = useContext(AppDataContext);

  const queryString = useMemo(() => {
    return {
      api_key: getApiKey(),
      lineupId: lineup.lineupId,
      startDateTime: selectedDate?.format('YYYY-MM-DD') ?? '',
    };
  }, [getApiKey, lineup.lineupId, selectedDate]);
  const { data, isLoading } = useGetMoviesOnTvQuery(queryString);

  return (
    <MainContent data={data?.map(movieToShowMapper)} isLoading={isLoading} />
  );
};
