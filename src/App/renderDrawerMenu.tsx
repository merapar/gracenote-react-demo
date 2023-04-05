import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Link as MuiLink,
} from "@mui/material";
import { KeyboardEvent, MouseEvent } from "react";
import { verticalGradient } from "./gradients";
import { Link } from "react-router-dom";
import { routesConfig } from "../index";

const ItemMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: 5,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));
const ListLink: typeof MuiLink = styled(MuiLink)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  width: "100%",
}));
export type ToggleDrawer = (
  open: boolean
) => (event: KeyboardEvent | MouseEvent) => void;

export const renderDrawerMenu = (toggleDrawer: ToggleDrawer) => {
  return (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{
        background: verticalGradient,
        flex: 1,
        paddingTop: "2rem",
        color: "#fff",
      }}
    >
      <List>
        {routesConfig.map(({ title, url }, index) => {
          return (
            <ListItem key={title} disablePadding>
              <ListLink component={Link} to={url}>
                <ListItemButton sx={{ position: "relative" }}>
                  <ListItemText sx={{ margin: "1rem 0" }} primary={title} />
                  <ItemMarked />
                </ListItemButton>
              </ListLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
