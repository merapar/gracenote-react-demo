import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  CardActions,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { GetMoviesShowingsQueryResponseType } from "../api/useGetMoviesShowingsQuery";

import { Hero } from "./Hero";

import { ShowTimes } from "./ShowTimes";

interface ShowDetailsData {
  selectedShow: GetMoviesShowingsQueryResponseType;
  showDetailsHandler: Function;
}

export const ShowDetails = ({
  selectedShow,
  showDetailsHandler,
}: ShowDetailsData) => {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  return (
    <Container maxWidth="md">
      <Grid container pb={5}>
        {selectedShow.map((show) => (
          <Grid item key={show.tmsId} xs={12}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Hero imageUrl={`${imageBaseUrl}${show.preferredImage.uri}`} />
              <CardActions>
                <Button onClick={() => showDetailsHandler("")} size="small">
                  <ArrowBackIosIcon />
                  Back
                </Button>
              </CardActions>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {show.title}
                </Typography>
                <Typography>{show.longDescription}</Typography>
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Show Times
                </Typography>
                <ShowTimes showtime={show.showtimes} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
