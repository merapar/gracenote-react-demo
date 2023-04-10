import {
  Button,
  Container,
  Grid,
  CardActions,
  CardMedia,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { GetMoviesShowingsQueryResponseType } from "../api/useGetMoviesShowingsQuery";



interface ShowsDetailsData {
  shows: GetMoviesShowingsQueryResponseType;
  showDetailsHandler: Function;
}

export const Shows = ({ shows, showDetailsHandler }: ShowsDetailsData) => {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {shows &&
          !!shows.length &&
          shows.map((show) => (
            <Grid item key={show.tmsId} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={`${imageBaseUrl}${show.preferredImage.uri}`}
                  alt={show.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {show.title}
                  </Typography>
                  <Typography>{show.shortDescription}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => showDetailsHandler(show.tmsId)}
                    size="small"
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};
