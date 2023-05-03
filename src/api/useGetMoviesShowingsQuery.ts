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

export type MovieShowings = {
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
};

export type MoviesShowingsParams = {
  startDate: string;
  zip: number;
};

const getMoviesShowings = (
  params: MoviesShowingsParams,
): UseQueryOptions<MovieShowings[]> => ({
  queryKey: ['movies/showings', params],
  queryFn: async ({ signal }) => {
    const { data } = await request<MovieShowings[]>({
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
