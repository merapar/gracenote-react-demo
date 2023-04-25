import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';

import { request } from './index';

enum Qualifier {
  Cc = 'CC',
  DD51 = 'DD 5.1',
  Dvs = 'DVS',
  Letterbox = 'Letterbox',
  New = 'New',
  Premiere = 'Premiere',
  Stereo = 'Stereo',
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

export interface GetMoviesAiringsQueryResponse {
  channels: string[];
  duration: number;
  endTime: string;
  program: Program;
  qualifiers: Qualifier[];
  startTime: string;
  station: Station;
  stationId: string;
}

type GetMoviesAiringsResponseType = GetMoviesAiringsQueryResponse[];

interface MoviesAiringsParams {
  lineupId: string;
  startDateTime: string;
}

const getMoviesAirings = (
  params: MoviesAiringsParams,
): UseQueryOptions<GetMoviesAiringsResponseType> => ({
  queryKey: ['movies/airings', params],
  queryFn: async ({ signal }) => {
    const { data } = await request<GetMoviesAiringsResponseType>({
      url: 'movies/airings',
      params,
      signal,
    });
    return data;
  },
  enabled: !!params.lineupId,
});

export const useGetMoviesAirings = (params: MoviesAiringsParams) =>
  useQuery(getMoviesAirings(params));
