import { Dispatch, FC, SetStateAction } from 'react';
import { styled } from '@mui/material';

import { DateSelector } from './DateSelector';
import { LocationSelector } from './LocationSelector';
import { Box } from './Box';

type Props = {
  currentZipCode: number;
  setZipCode: Dispatch<SetStateAction<number>>;
};

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

export const Navigation: FC<Props> = ({ currentZipCode, setZipCode }) => {
  return (
    <Container>
      <DateSelector />

      <div style={{ width: '4rem', height: '1rem' }}></div>
      <LocationSelector
        currentZipCode={currentZipCode}
        setZipCode={setZipCode}
      />
    </Container>
  );
};
