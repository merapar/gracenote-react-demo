import { DatePicker } from '@mui/x-date-pickers';
import { Dispatch, SetStateAction } from 'react';
import { Label } from './Label';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

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

export const DateSelector = ({
  setSelectedDate,
  selectedDate,
}: {
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
}) => {
  return (
    <Stack direction={'row'} alignItems={'center'}>
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
            setSelectedDate(value);
          }}
        />
      </ThemeProvider>
    </Stack>
  );
};
