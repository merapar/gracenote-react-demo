import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { GetLineupsQueryResponse } from "../api/useGetLineupsQuery";
import { Lineup } from "./Lineup";

export const Lineups = ({
  data: lineups,
  isLoading,
}: {
  data: GetLineupsQueryResponse | undefined;
  isLoading: boolean;
}) => {
  // Limit the content to 1 type in a selected location
  return (
    <Container maxWidth={false}>
      <Grid container>
        {isLoading && (
          <Grid item>
            <CircularProgress />
          </Grid>
        )}
        {lineups && (
          <Grid item key={lineups.lineupId} xs={12}>
            <Card>
              <CardContent>
                <Typography>{lineups?.mso.name}</Typography>
                <Lineup lineup={lineups} />
              </CardContent>
            </Card>
          </Grid>
        )}
        {/* {lineups?.map((lineup) => (
          <Grid item key={lineup.lineupId} xs={12}>
            <Card>
              <CardContent>
                <Typography>{lineup?.mso.name}</Typography>
                <Lineup lineup={lineup} />
              </CardContent>
            </Card>
          </Grid>
        ))} */}
      </Grid>
    </Container>
  );
};
