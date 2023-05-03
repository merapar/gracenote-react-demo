import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText as MuiListItemText,
  styled,
  Link as MuiLink,
} from '@mui/material';
import { KeyboardEvent, MouseEvent } from 'react';
import { verticalGradient } from './gradients';
import { Link, useLocation } from 'react-router-dom';
import { drawerRoutesConfig } from './router';

const ListItemText = styled(MuiListItemText)(() => ({
  margin: '1rem 0',
  textAlign: 'center',
  fontSize: '1.3rem',
  fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.00938em',
  display: 'block',
}));

const ListLink: typeof MuiLink = styled(MuiLink)(() => ({
  color: '#fff',
  textDecoration: 'none',
  width: '100%',
}));

export const DrawerMenu = ({
  onClose,
}: {
  onClose: (event: KeyboardEvent | MouseEvent) => void;
}) => {
  const closeDrawerDelayed = (e: KeyboardEvent | MouseEvent) => {
    setTimeout(onClose, 250, e);
  };
  const currentRoute = useLocation();
  return (
    <Box
      role="presentation"
      onClick={closeDrawerDelayed}
      onKeyDown={closeDrawerDelayed}
      sx={{
        background: verticalGradient,
        flex: 1,
        paddingTop: '2rem',
        color: '#fff',
      }}
    >
      <List>
        {drawerRoutesConfig.map(({ title, url }) => {
          return (
            <ListItem key={title}>
              <ListLink component={Link} to={url}>
                <ListItemButton
                  divider
                  selected={currentRoute.pathname === url}
                >
                  <ListItemText disableTypography primary={title} />
                </ListItemButton>
              </ListLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
