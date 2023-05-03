import { Dayjs } from 'dayjs';
import { SportAirings } from '../api/useGetSportsAiringsQuery';
import { ContentDashboard } from '../components/ContentDashboard';
import {
  ContentItem,
  filterContentItemsPredicate,
} from '../components/ContentGallery';
import { useOutletContext } from 'react-router-dom';
import { useMemo } from 'react';
import { useGetSportsOnTV } from '../hooks/useGetSportsOnTV';

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

  const { data, isFetching } = useGetSportsOnTV({
    zip: zipCode,
    startDateTime: selectedDate,
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
