import { useContext, useMemo } from 'react';

import { GetLineupsQueryResponse } from '../api/useGetLineupsQuery';
import {
  GetMoviesOnTvQueryResponse,
  useGetMoviesOnTvQuery,
} from '../api/useGetMoviesOnTvQuery';
import { MainContent, Show } from './MainContent';
import { ApiKeyContext } from '../store/ApiKeyContext';
import { AppDataContext } from '../store/AppDataContext';

const movieToShowMapper = (movie: GetMoviesOnTvQueryResponse): Show => {
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
  const { apiKeyValue } = useContext(ApiKeyContext);
  const { selectedDate } = useContext(AppDataContext);

  const queryString = useMemo(() => {
    return {
      api_key: apiKeyValue,
      lineupId: lineup.lineupId,
      startDateTime: selectedDate?.format('YYYY-MM-DD') ?? '',
    };
  }, [apiKeyValue, lineup.lineupId, selectedDate]);
  const { data, isLoading } = useGetMoviesOnTvQuery(queryString);

  return (
    <MainContent data={data?.map(movieToShowMapper)} isLoading={isLoading} />
  );
};
