import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { ApiKeyContext } from '../store/ApiKeyContext';

export const APIKeyPage = () => {
  const { apiKeyValue, onSetApiKey, onResetApiKey } = useContext(ApiKeyContext);

  const [apiKey, setApiKey] = useState(apiKeyValue);

  useEffect(() => {
    setApiKey(apiKeyValue);
  }, [apiKeyValue]);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const updateValueHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setApiKey(event.target.value);
  };

  const resetClickHandler = () => {
    setApiKey('');
    onResetApiKey();
  };

  const buttonClickHandler = () => {
    onSetApiKey(apiKey);

    navigate(from, { replace: true });
  };

  return (
    <Card>
      <Grid container direction="column" alignItems="center" p={3}>
        <Grid item>
          <Typography variant="h5" align="center">
            Please provide your API Key here.
          </Typography>
          <Typography variant="h6" align="center">
            You can return to this page and update your API Key if required.
          </Typography>
        </Grid>
        <Grid item pt={2} width="50%">
          <TextField
            fullWidth
            label="API Key"
            onChange={updateValueHandler}
            value={apiKey}
            required
          />
        </Grid>
        <Grid item>
          <CardActions>
            <Button variant="outlined" onClick={resetClickHandler}>
              Reset
            </Button>
            <Button
              disabled={apiKey.length <= 5}
              variant="contained"
              onClick={buttonClickHandler}
            >
              Submit
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
