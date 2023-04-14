import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query/src/types";

import { request } from "./index";

export type GetMoviesShowingsQueryResponseType = {
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
}[];

export type MoviesShowingsParams = {
  startDate: string;
  zip: number;
  api_key: string;
};

const getMoviesShowings = (
  params: MoviesShowingsParams
): UseQueryOptions<GetMoviesShowingsQueryResponseType> => ({
  queryKey: ["movies/showings", params],
  queryFn: async ({ signal }) => {
    const { data } = await request<GetMoviesShowingsQueryResponseType>({
      url: process.env.REACT_APP_MOVIES_THEATRE_PATH_NAME,
      params,
      signal,
    });
    return data;
  },
});

export const useGetMoviesShowingsQuery = (params: MoviesShowingsParams) => {
  console.log("getMoviesShowings>", getMoviesShowings);
  console.log("params>", params);
  return useQuery(getMoviesShowings(params));
};
