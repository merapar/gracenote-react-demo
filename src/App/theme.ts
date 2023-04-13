import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4485A8", //TODO investigate why can't use var(--brand....)
    },
    secondary: {
      main: "#EC6434",
    },
    background: {
      default: "var(--brand-color-45)",
    },
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-checked": { color: "#fff" },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundSize: "100% 100%",
            backgroundPosition: "0px 0px",
            backgroundColor: "transparent",
            backgroundImage:
              "radial-gradient(75% 75% at 50% 50%, #FFFFFF44 0%, #073AFF00 38%)",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});
