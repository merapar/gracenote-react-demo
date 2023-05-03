import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';

import { request } from './index';

export type MovieShowTime = {
  theatre: {
    id: number;
    name: string;
  };
  dateTime: string;
  barg: boolean;
  ticketURI: string;
};

export interface MovieShowings {
  tmsId: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  preferredImage: {
    width: number;
    height: number;
    uri: string;
    category: string;
    text: string;
    primary: boolean;
  };
  showtimes: MovieShowTime[];
}

type GetMoviesShowingsQueryResponseType = MovieShowings[];

export type MoviesShowingsParams = {
  startDate: string;
  zip: number;
};

const getMoviesShowings = (
  params: MoviesShowingsParams,
): UseQueryOptions<GetMoviesShowingsQueryResponseType> => ({
  keepPreviousData: true,
  queryKey: ['movies/showings', params],
  queryFn: async ({ signal }) => {
    const { data } = await request<GetMoviesShowingsQueryResponseType>({
      url: 'movies/showings',
      params,
      signal,
    });
    // Fix Gracenote API bug where it returns an empty array instead of an empty object
    return Array.isArray(data) ? data : [];
  },
});

export const useGetMoviesShowingsQuery = (params: MoviesShowingsParams) =>
  useQuery(getMoviesShowings(params));
