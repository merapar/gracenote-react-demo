import { DatePicker } from "@mui/x-date-pickers";
import { Dispatch, FC, SetStateAction } from "react";
import { Box } from "./Box";
import { Label } from "./Label";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { createTheme, ThemeProvider } from "@mui/material";
import { Dayjs } from "dayjs";

type Props = {
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
};

const theme = createTheme({
  components: {
    MuiDateField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "#fff",
          ".MuiButtonBase-root": {
            color: "#fff",
          },
        },
      },
    },
  },
});

export const DateSelector: FC<Props> = ({ setSelectedDate, selectedDate }) => {
  return (
    <Box flexDirection={"row"} sx={{ alignItems: "center" }}>
      <Label variant="h4" sx={{ mr: "1.5rem" }}>
        <span>Choose Date</span>
      </Label>
      <ThemeProvider theme={theme}>
        <DatePicker<Dayjs | null>
          closeOnSelect
          value={selectedDate}
          slotProps={{
            textField: {
              InputProps: {
                style: {
                  color: "#fff",
                  borderColor: "#fff",
                  borderStyle: "solid",
                  borderWidth: "1px",
                },
              },
              size: "small",
            },
            field: {
              className: "test",
            },
          }}
          onChange={(value) => {
            setSelectedDate(value);
          }}
        />
      </ThemeProvider>
    </Box>
  );
};
