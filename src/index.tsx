import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StyleSheetManager } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
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
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyleSheetManager
      disableVendorPrefixes={process.env.NODE_ENV === "development"}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyleSheetManager>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
