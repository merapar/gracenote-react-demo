import { FC } from 'react';
import {
  Button,
  Container,
  Grid,
  CardActions,
  CardMedia,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { IMAGE_BASE_URL } from '../api';

export interface ShowTime {
  location: string;
  dateTime: string;
}

export interface ContentItem {
  tmsId: string;
  imageUri: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  showtimes: ShowTime[];
}

interface Props {
  contentItems: ContentItem[];
  showDetailsHandler: (selectedShowId: string) => void;
}

export const ContentGallery: FC<Props> = ({
  contentItems,
  showDetailsHandler,
}) => {
  return (
    <Container sx={{ py: 8 }} maxWidth={false}>
      <Grid container spacing={4}>
        {contentItems &&
          !!contentItems.length &&
          contentItems.map((item: ContentItem) => (
            <Grid item key={item.tmsId} xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={`${IMAGE_BASE_URL}${item.imageUri}`}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography>{item.shortDescription}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => showDetailsHandler(item.tmsId)}
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
