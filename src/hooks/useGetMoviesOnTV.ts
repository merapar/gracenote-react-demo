import { Dayjs } from 'dayjs';
import { useGetLineupsQuery } from '../api/useGetLineupsQuery';
import { useGetMoviesAirings } from '../api/useGetMoviesAiringsQuery';

export const useGetMoviesOnTV = ({
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

  return useGetMoviesAirings({
    lineupId: lineupId,
    startDateTime: dateTimeString,
  });
};
