import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { ScreensMenu, ToggleDrawer } from "./App/ScreensMenu";
import { horizontalGradient } from "./App/gradients";
import { Outlet, useOutletContext } from "react-router-dom";
import { Locations } from "./components/LocationSelector";

type ContextType = {
  locationSelector: {
    currentZipCode: number;
  };
};
export const useLocationSelector = () => {
  return useOutletContext<ContextType>();
};
function App() {
  const [currentZipCode, setZipCode] = useState(Locations.California);

  const [state, setState] = useState({ open: false });

  const toggleDrawer: ToggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ open });
    };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <AppBar
        sx={{
          background: horizontalGradient,
        }}
        component="nav"
        position={"sticky"}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={state.open}
            onClose={toggleDrawer(false)}
          >
            <ScreensMenu {...{ toggleDrawer, setZipCode, currentZipCode }} />
          </Drawer>
          <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
            GRACENOTE
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet
          context={{
            locationSelector: {
              currentZipCode,
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default App;
