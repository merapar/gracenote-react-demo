import { DateSelector } from './DateSelector';
import { LocationSelector } from './LocationSelector';
import { Dispatch, FC, SetStateAction } from 'react';
import { Box } from './Box';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material';

const Container = styled(Box)(({ theme }) => {
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

type Props = {
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
  currentZipCode: number;
  setZipCode: Dispatch<SetStateAction<number>>;
};

export const Navigation: FC<Props> = ({
  selectedDate,
  setSelectedDate,
  currentZipCode,
  setZipCode,
}) => {
  return (
    <Container>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div style={{ width: '4rem', height: '1rem' }}></div>
      <LocationSelector
        currentZipCode={currentZipCode}
        setZipCode={setZipCode}
      />
    </Container>
  );
};
