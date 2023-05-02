import {
  Container,
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../api';
import { ShowTimes } from '../components/ShowTimes';

export const ContenDetailsPage = () => {
  const { contentDetails } = useLocation().state;
  console.log(contentDetails);

  return (
    <Container maxWidth="md">
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
              image={`${IMAGE_BASE_URL}${contentDetails.imageUri}`}
              alt="random"
            />
          </Container>
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {contentDetails.title}
          </Typography>
          <Typography>{contentDetails.longDescription}</Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Show Times
          </Typography>
          <ShowTimes showTimes={contentDetails.showtimes} />
        </CardContent>
      </Card>
    </Container>
  );
};
