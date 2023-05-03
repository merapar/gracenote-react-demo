import { Dayjs } from 'dayjs';
import { useGetMoviesShowingsQuery } from '../api/useGetMoviesShowingsQuery';

export const useGetMoviesInCinema = ({
  startDateTime,
  zipCode,
}: {
  startDateTime: Dayjs;
  zipCode: number;
}) => {
  return useGetMoviesShowingsQuery({
    startDate: startDateTime?.format('YYYY-MM-DD') ?? '',
    zip: zipCode,
  });
};
