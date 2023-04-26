import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  CardActions,
  Typography,
  CardMedia,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import type { ContentItem } from './ContentGallery';
import { ShowTimes } from './ShowTimes';
import { IMAGE_BASE_URL } from '../api';

interface ShowDetailsData {
  selectedShow: ContentItem[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  showDetailsHandler: Function;
}

export const ShowDetails = ({
  selectedShow,
  showDetailsHandler,
}: ShowDetailsData) => {
  return (
    <Container maxWidth="md">
      <Grid container pb={5}>
        {selectedShow.map((item: ContentItem) => (
          <Grid item key={item.tmsId} xs={12}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ pt: 8, pb: 6 }}>
                <Container maxWidth="sm">
                  <CardMedia
                    component="img"
                    image={`${IMAGE_BASE_URL}${item.imageUri}`}
                    alt="random"
                  />
                </Container>
              </Box>

              <CardActions>
                <Button onClick={() => showDetailsHandler('')} size="small">
                  <ArrowBackIosIcon />
                  Back
                </Button>
              </CardActions>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography>{item.longDescription}</Typography>
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Show Times
                </Typography>
                <ShowTimes showTimes={item.showtimes} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
