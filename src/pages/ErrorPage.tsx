import { Typography, Stack } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Stack sx={{ color: 'background.paper', p: 2 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Oops!
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="background.paper"
        component="p"
      >
        Sorry, an unexpected error has occurred
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="background.paper"
        component="p"
      >
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).statusText || (error as any).message
        }
      </Typography>
    </Stack>
  );
};
