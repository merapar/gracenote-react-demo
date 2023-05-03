import { KeyboardEvent, MouseEvent, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { DrawerMenu } from './App/DrawerMenu';
import { horizontalGradient } from './App/gradients';
import { getRouteTitleByPath } from './App/router';
import { Footer } from './components/Footer';
import { Locations } from './components/LocationSelector';
import dayjs, { Dayjs } from 'dayjs';
import { ParamSelectorPropsType } from './components/ParamSelector';

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [zipCode, setZipCode] = useState<number>(Locations['New York']);

  const paramSelectorContext: ParamSelectorPropsType = {
    selectedDate,
    setSelectedDate,
    zipCode,
    setZipCode,
  };

  const [drawerState, setDrawerState] = useState(false);
  const currentRoute = useLocation();
  const routeTitle = getRouteTitleByPath(currentRoute.pathname);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerState(open);
    };

  return (
    <Container
      id={'app-container'}
      disableGutters
      maxWidth={false}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <AppBar
        sx={{
          background: horizontalGradient,
        }}
        component="nav"
        position={'sticky'}
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
            anchor={'left'}
            open={drawerState}
            onClose={toggleDrawer(false)}
          >
            <DrawerMenu onClose={toggleDrawer(false)} />
          </Drawer>
          <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
            Gracenote API Demo &ndash; <span>{routeTitle}</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box pt={3} pb={3} id={'app-outlet'}>
        <Outlet context={paramSelectorContext} />
      </Box>
      <Footer />
    </Container>
  );
}

export default App;
