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
import {
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import { ScreensMenu, ToggleDrawer } from "./App/ScreensMenu";
import { horizontalGradient } from "./App/gradients";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Locations } from "./components/LocationSelector";
import { getRouteTitleByPath } from "./App/routes";

type ContextType = {
  locationSelector: {
    currentZipCode: number;
    setZipCode: Dispatch<SetStateAction<number>>;
  };
};
export const useLocationSelector = () => {
  return useOutletContext<ContextType>();
};
function App() {
  const [currentZipCode, setZipCode] = useState(Locations["New York"]);

  const [drawerState, setDrawerState] = useState({ open: false });
  const currentRoute = useLocation();
  const routeTitle = getRouteTitleByPath(currentRoute.pathname);
  const toggleDrawer: ToggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerState({ open });
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
            open={drawerState.open}
            onClose={toggleDrawer(false)}
          >
            <ScreensMenu {...{ toggleDrawer }} />
          </Drawer>
          <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
            Gracenote API Demo {">>"} {routeTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet
          context={{
            locationSelector: {
              currentZipCode,
              setZipCode,
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default App;
