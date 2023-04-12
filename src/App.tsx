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
import { renderDrawerMenu, ToggleDrawer } from "./App/renderDrawerMenu";
import { horizontalGradient } from "./App/gradients";
import { Outlet } from "react-router-dom";

function App() {
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
    <Container sx={{ display: "flex", flexDirection: "column" }}>
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
            {renderDrawerMenu(toggleDrawer)}
          </Drawer>
          <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
            GRACENOTE
          </Typography>
        </Toolbar>
      </AppBar>
      <Box pt={3}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default App;
