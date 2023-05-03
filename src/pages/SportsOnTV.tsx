import { Dayjs } from 'dayjs';
import { useGetLineupsQuery } from '../api/useGetLineupsQuery';
import {
  useGetSportsAirings,
  SportAirings,
} from '../api/useGetSportsAiringsQuery';
import { ContentDashboard } from '../components/ContentDashboard';
import {
  ContentItem,
  filterContentItemsPredicate,
} from '../components/ContentGallery';
import { useOutletContext } from 'react-router-dom';
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

export const SportsOnTv = () => {
  const [selectedDate, zipCode] = useOutletContext<[Dayjs, number]>();

  const startDateTime = selectedDate?.format('YYYY-MM-DDTHH:mm[Z]') ?? '';

  const { data: lineupData } = useGetLineupsQuery({
    startDateTime: startDateTime,
    postalCode: zipCode.toString(),
    country: 'USA',
  });

  // Just select the first lineup for current Zipcode
  const lineupId = lineupData?.[0].lineupId ?? '';

  const { data, isFetching } = useGetSportsAirings({
    lineupId: lineupId,
    startDateTime: startDateTime,
  });

  const items = useMemo(
    () =>
      data
        ?.map(sportAiringToContentItemMapper)
        .filter(filterContentItemsPredicate) ?? [],
    [data],
  );

  return <ContentDashboard isLoading={isFetching} contentItems={items} />;
};
