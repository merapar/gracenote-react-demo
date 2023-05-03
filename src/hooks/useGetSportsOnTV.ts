import { Dayjs } from 'dayjs';
import { useGetLineupsQuery } from '../api/useGetLineupsQuery';
import { useGetSportsAirings } from '../api/useGetSportsAiringsQuery';

export const useGetSportsOnTV = ({
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

  return useGetSportsAirings({
    lineupId: lineupId,
    startDateTime: dateTimeString,
  });
};
