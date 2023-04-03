import { LandingPage } from "./pages/LandingPage";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { KeyboardEvent, MouseEvent, useState } from "react";

type ToggleDrawer = (
  open: boolean
) => (event: KeyboardEvent | MouseEvent) => void;

const horizontalGradient = `background-size: 100% 100%;
background-position: 0px 0px;
background-image: 
linear-gradient(90deg, 
    var(--brand-color-45) 5%, 
    var(--brand-color-01) 40%, 
    var(--brand-color-03) 60%, 
    var(--brand-color-44) 95%)`;
const verticalGradient = `background-size: 100% 100%;
background-position: 0px 0px;
background-image: 
linear-gradient(0deg, 
    var(--brand-color-45) 2%, 
    var(--brand-color-01) 5%, 
    var(--brand-color-03) 95%, 
    var(--brand-color-44) 98%)`;

const ItemMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: 5,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const renderDrawerMenu = (toggleDrawer: ToggleDrawer) => {
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
        {["Showings near you", "What's on TV"].map((text, index) => {
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ position: "relative" }}>
                <ListItemText sx={{ margin: "1rem 0" }} primary={text} />
                <ItemMarked />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

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
      <Box>
        <LandingPage />
      </Box>
    </Container>
  );
}

export default App;
