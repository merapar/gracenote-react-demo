import { DateSelector } from './DateSelector';
import { LocationSelector } from './LocationSelector';
import { Dispatch, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import { Stack, styled } from '@mui/material';

const Container = styled(Stack)(({ theme }) => {
  return {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  };
});

export const ParamSelector = ({
  selectedDate,
  setSelectedDate,
  zipCode,
  setZipCode,
}: {
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
  zipCode: number;
  setZipCode: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Container>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div style={{ width: '4rem', height: '1rem' }}></div>
      <LocationSelector
        selectedZipCode={zipCode}
        setSelectedZipCode={setZipCode}
      />
    </Container>
  );
};
