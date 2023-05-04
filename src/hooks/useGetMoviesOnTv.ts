import { Dayjs } from 'dayjs';
import { useGetLineupsQuery } from '../api/useGetLineupsQuery';
import {
  MovieAirings,
  useGetMoviesAiringsQuery,
} from '../api/useGetMoviesAiringsQuery';
import { ContentItem } from '../components/ContentGallery';
import { useMemo } from 'react';

const movieAiringToContentItemMapper = ({
  program,
  startTime,
  station,
}: MovieAirings): ContentItem => {
  const { longDescription, preferredImage, shortDescription, title, tmsId } =
    program;

  return {
    longDescription,
    imageUri: preferredImage.uri,
    shortDescription,
    showtimes: [
      {
        location: station.callSign,
        dateTime: startTime,
      },
    ],
    title,
    tmsId,
  };
};

export const useGetMoviesOnTv = ({
  startDateTime,
  zip,
}: {
  startDateTime: Dayjs;
  zip: number;
}) => {
  const dateTimeString = startDateTime?.format('YYYY-MM-DDTHH:mm[Z]') ?? '';
  const { data: lineupData } = useGetLineupsQuery({
    startDateTime: dateTimeString,
    postalCode: zip,
    country: 'USA',
  });

  // Just select the first lineup for current Zipcode
  const lineupId = lineupData?.[0].lineupId ?? '';

  const { data, isLoading } = useGetMoviesAiringsQuery({
    lineupId: lineupId,
    startDateTime: dateTimeString,
  });

  const contentItems = useMemo(
    () => data?.map(movieAiringToContentItemMapper) ?? [],
    [data],
  );
  return { contentItems, isLoading };
};
