import { DatePicker } from '@mui/x-date-pickers';
import { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';

import { Box } from './Box';
import { Label } from './Label';
import { AppDataContext } from '../store/AppDataContext';

const theme = createTheme({
  components: {
    MuiDateField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: '#fff',
          '.MuiButtonBase-root': {
            color: '#fff',
          },
        },
      },
    },
  },
});

export const DateSelector = () => {
  const { selectedDate, onSetSelectedDate } = useContext(AppDataContext);

  return (
    <Box flexDirection={'row'} sx={{ alignItems: 'center' }}>
      <Label variant="h4" sx={{ mr: '1.5rem' }}>
        <span>Choose Date</span>
      </Label>
      <ThemeProvider theme={theme}>
        <DatePicker<Dayjs | null>
          closeOnSelect
          value={selectedDate}
          minDate={dayjs()}
          slotProps={{
            textField: {
              InputProps: {
                style: {
                  color: '#fff',
                  borderColor: '#fff',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                },
              },
              size: 'small',
            },
            field: {
              className: 'test',
            },
          }}
          onChange={(value) => {
            // To cleanup
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onSetSelectedDate(value!);
          }}
        />
      </ThemeProvider>
    </Box>
  );
};
