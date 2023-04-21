import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query/src/types";

import { request } from "./index";

enum Qualifier {
  Cc = "CC",
  DD51 = "DD 5.1",
  Dvs = "DVS",
  Letterbox = "Letterbox",
  New = "New",
  Premiere = "Premiere",
  Stereo = "Stereo",
}
type VideoQuality = {
  signalType: string;
  videoType: string;
};
type StationPreferredImage = {
  width: string;
  height: string;
  uri: string;
  category: string;
  primary: string;
};
type Station = {
  stationId: string;
  callSign: string;
  videoQuality: VideoQuality;
  preferredImage: StationPreferredImage;
  channel: string;
};
type Program = {
  tmsId: string;
  rootId: string;
  subType: string;
  title: string;
  releaseYear: number;
  releaseDate: string;
  titleLang: string;
  descriptionLang: string;
  entityType: string;
  genres: string[];
  longDescription: string;
  shortDescription: string;
  topCast: string[];
  directors?: string[];
  qualityRating?: QualityRating;
  ratings?: Rating[];
  preferredImage: ProgramPreferredImage;
  audience?: string;
};
type QualityRating = {
  ratingsBody: string;
  value: string;
};
type ProgramPreferredImage = {
  width: string;
  height: string;
  uri: string;
  category: string;
  text: string;
  primary: string;
  caption?: Caption;
};
type Caption = {
  content: string;
  lang: string;
};

type Rating = {
  body: string;
  code: string;
  subRating?: string;
};

export interface GetMoviesOnTvQueryResponse {
  channels: string[];
  duration: number;
  endTime: string;
  program: Program;
  qualifiers: Qualifier[];
  startTime: string;
  station: Station;
  stationId: string;
}

type GetMoviesOnTvQueryResponseType = GetMoviesOnTvQueryResponse[];

interface MoviesOntvParams {
  api_key: string;
  lineupId: string;
  startDateTime: any;
}

const getMoviesOnTv = (
  params: MoviesOntvParams
): UseQueryOptions<GetMoviesOnTvQueryResponseType> => ({
  queryKey: ["movies/airings", params],
  queryFn: async ({ signal }) => {
    const { data } = await request<GetMoviesOnTvQueryResponseType>({
      url: 'movies/airings',
      params,
      signal,
    });
    return data;
  },
});

export const useGetMoviesOnTvQuery = (params: MoviesOntvParams) =>
  useQuery(getMoviesOnTv(params));
