import { DatePicker } from "@mui/x-date-pickers";
import { Dispatch, FC, SetStateAction } from "react";
import { Box } from "./Box";
import { Label } from "./Label";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { createTheme, ThemeProvider } from "@mui/material";

type Props = {
  setSelectedDate: Dispatch<SetStateAction<string>>;
  selectedDate: string;
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
  },
});

export const DateSelector: FC<Props> = ({ setSelectedDate }) => {
  return (
    <Box flexDirection={"row"} sx={{ alignItems: "center" }}>
      <Label variant="h4" sx={{ mr: "1.5rem" }}>
        <span>Choose Date</span>
      </Label>
      <ThemeProvider theme={theme}>
        <DatePicker<string>
          closeOnSelect
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
            setSelectedDate(value ?? "");
            console.log("onClose");
          }}
        />
      </ThemeProvider>
    </Box>
  );
};
