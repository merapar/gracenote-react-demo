import { Typography, Link, Box } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="background.paper" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://merapar.com/" underline={'none'}>
        Merapar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <Box sx={{ color: 'background.paper', p: 2 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Merapar
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="background.paper"
        component="p"
      >
        Gracenote demo project
      </Typography>
      <Copyright />
    </Box>
  );
};
