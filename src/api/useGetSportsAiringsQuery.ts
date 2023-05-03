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
  Live = 'Live',
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
  seriesId: string;
  sportsId: string;
  subType: string;
  title: string;
  eventTitle: string;
  gameDate: string;
  gameTime: string;
  gameTimeZone: string;
  titleLang: string;
  descriptionLang: string;
  entityType: string;
  genres: string[];
  longDescription: string;
  shortDescription: string;
  ratings?: Rating[];
  preferredImage: ProgramPreferredImage;
  audience?: string;
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

export type SportAirings = {
  startTime: string;
  endTime: string;
  duration: number;
  qualifiers: Qualifier[];
  channels: string[];
  program: Program;
  station: Station;
  stationId: string;
};

type SportsAiringsParams = {
  lineupId: string;
  startDateTime: string;
};

const getSportsAirings = (
  params: SportsAiringsParams,
): UseQueryOptions<SportAirings[]> => ({
  queryKey: ['sports/all/events/airings', params],
  queryFn: async ({ signal }) => {
    const { data } = await request<SportAirings[]>({
      url: 'sports/all/events/airings',
      params,
      signal,
    });
    // Fix Gracenote API bug where it returns an empty array instead of an empty object
    return data.length ? data : [];
  },
  enabled: !!params.lineupId,
});

export const useGetSportsAirings = (params: SportsAiringsParams) =>
  useQuery(getSportsAirings(params));
