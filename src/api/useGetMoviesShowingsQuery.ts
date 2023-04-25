import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';

import { request } from './index';

interface GetMoviesShowingsQueryResponse {
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
  showtimes: {
    theatre: {
      id: number;
      name: string;
    };
    dateTime: string;
    barg: boolean;
    ticketURI: string;
  }[];
}

export type GetMoviesShowingsQueryResponseType =
  GetMoviesShowingsQueryResponse[];

export type MoviesShowingsParams = {
  startDate: string;
  zip: number;
};

const getMoviesShowings = (
  params: MoviesShowingsParams,
): UseQueryOptions<GetMoviesShowingsQueryResponseType> => ({
  queryKey: ['movies/showings', params],
  queryFn: async ({ signal }) => {
    const { data } = await request<GetMoviesShowingsQueryResponseType>({
      url: 'movies/showings',
      params,
      signal,
    });
    return data;
  },
});

export const useGetMoviesShowingsQuery = (params: MoviesShowingsParams) =>
  useQuery(getMoviesShowings(params));
