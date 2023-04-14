export enum Qualifier {
  Cc = "CC",
  DD51 = "DD 5.1",
  Dvs = "DVS",
  Letterbox = "Letterbox",
  New = "New",
  Premiere = "Premiere",
  Stereo = "Stereo",
}
export type VideoQuality = {
  signalType: string;
  videoType: string;
};
export type StationPreferredImage = {
  width: string;
  height: string;
  uri: string;
  category: string;
  primary: string;
};
export type Station = {
  stationId: string;
  callSign: string;
  videoQuality: VideoQuality;
  preferredImage: StationPreferredImage;
  channel: string;
};
export type MoviesOnTVDatum = {
  startTime: string;
  endTime: string;
  duration: number;
  qualifiers: Qualifier[];
  channels: string[];
  program: Program;
  stationId: string;
  station: Station;
};
export type Program = {
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
export type QualityRating = {
  ratingsBody: string;
  value: string;
};
export type ProgramPreferredImage = {
  width: string;
  height: string;
  uri: string;
  category: string;
  text: string;
  primary: string;
  caption?: Caption;
};
export type Caption = {
  content: string;
  lang: string;
};

export type Rating = {
  body: string;
  code: string;
  subRating?: string;
};
