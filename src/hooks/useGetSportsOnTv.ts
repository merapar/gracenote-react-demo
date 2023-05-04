import { Dayjs } from 'dayjs';
import { useGetLineupsQuery } from '../api/useGetLineupsQuery';
import {
  SportAirings,
  useGetSportsAiringsQuery,
} from '../api/useGetSportsAiringsQuery';
import { ContentItem } from '../components/ContentGallery';
import { useMemo } from 'react';

const sportAiringToContentItemMapper = (
  sportAiring: SportAirings,
): ContentItem => {
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
  } = sportAiring;

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

export const useGetSportsOnTv = ({
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

  const { data, isLoading } = useGetSportsAiringsQuery({
    lineupId: lineupId,
    startDateTime: dateTimeString,
  });

  const contentItems = useMemo(
    () => data?.map(sportAiringToContentItemMapper) ?? [],
    [data],
  );
  return { contentItems, isLoading };
};
