import { styled, Typography } from "@mui/material";

export const Label = styled(Typography)(({ theme }) => ({
  ...theme.typography.button,
  display: "flex",
  userSelect: "none",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.background.paper,
  padding: theme.spacing(1, 0),
}));
