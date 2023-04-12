import {
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiKeyContext } from "../store/api-key-context";

export const APIKeyPage = () => {
  const ApiKeyContextObj = useContext(ApiKeyContext);

  const [apiKeyValue, setApiKeyValue] = useState(ApiKeyContextObj.apiKey);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const updateValueHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setApiKeyValue(event.target.value);
  };

  const resetClickHandler = () => {
    ApiKeyContextObj.resetApiKey();
  };

  const buttonClickHandler = () => {
    ApiKeyContextObj.setApiKey(apiKeyValue);

    navigate(from, { replace: true });
  };

  return (
    <Card>
      <Grid container direction="column" alignItems="center" pt={3} pb={2}>
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
            value={apiKeyValue}
            required
          />
        </Grid>
        <Grid item>
          <CardActions>
            <Button variant="outlined" onClick={resetClickHandler}>
              Reset
            </Button>
            <Button
              disabled={apiKeyValue.length >= 5}
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
