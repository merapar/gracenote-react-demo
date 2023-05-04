import { Typography, Stack } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <Stack
      sx={{ color: 'background.paper', p: 2 }}
      component="footer"
      direction="column"
    >
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
        {errorMessage}
      </Typography>
    </Stack>
  );
};
