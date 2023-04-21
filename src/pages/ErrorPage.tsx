import { Box } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <Box>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{(error as any).statusText || (error as any).message}</i>
        </p>
      </div>
    </Box>
  );
};
