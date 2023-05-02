import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ShowTime } from './ContentGallery';

export const ShowTimes = ({ showTimes }: { showTimes: ShowTime[] }) => {
  return (
    <Grid container spacing={4}>
      {showTimes &&
        !!showTimes.length &&
        showTimes.map((showtime) => {
          const date = new Date(showtime.dateTime);

          return (
            <Grid
              item
              key={showtime.location + showtime.dateTime}
              xs={12}
              sm={6}
              md={4}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {date.toLocaleString()}
                  </Typography>
                  <Typography>{showtime.location}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};
