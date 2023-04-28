import { useGetLineupsQuery } from '../api/useGetLineupsQuery';
import {
  useGetMoviesAirings,
  MovieAirings,
} from '../api/useGetMoviesAiringsQuery';
import { ContentDashboard } from '../components/ContentDashboard';
import { ContentItem } from '../components/ContentGallery';
import { useOutletContext } from 'react-router-dom';

const movieAiringToContentItemMapper = (
  movieAiring: MovieAirings,
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
  } = movieAiring;

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

export const MoviesOnTv = () => {
  const [selectedDate, zipCode] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useOutletContext<Array<any>>();

  const startDateTime = selectedDate?.format('YYYY-MM-DDTHH:mm[Z]') ?? '';

  const { data: lineupData } = useGetLineupsQuery({
    startDateTime: startDateTime,
    postalCode: zipCode.toString(),
    country: 'USA',
  });

  // Just select the first lineup for current Zipcode
  const lineupId = lineupData?.[0].lineupId ?? '';

  const { data, isLoading } = useGetMoviesAirings({
    lineupId: lineupId,
    startDateTime: startDateTime,
  });

  return (
    <>
      <ContentDashboard
        contentItems={data?.map(movieAiringToContentItemMapper)}
        isLoading={isLoading}
      />
    </>
  );
};
