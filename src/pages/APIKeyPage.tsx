import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { getApiKey, setApiKey } from '../api';
import { ChangeEvent, useState } from 'react';

export const APIKeyPage = () => {
  const [key, setKey] = useState(getApiKey());

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const updateValueHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setKey(event.target.value);
  };

  const submitClickHandler = () => {
    setApiKey(key);
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
            value={key}
            required
          />
        </Grid>
        <Grid item>
          <CardActions>
            <Button
              disabled={key.length <= 5}
              variant="contained"
              onClick={submitClickHandler}
            >
              Submit
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
