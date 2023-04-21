import { Card, CardContent, Grid, Typography } from "@mui/material";

export const ShowTimes = ({ showtime }: any) => {
  return (
    <Grid container spacing={4}>
      {showtime &&
        !!showtime.length &&
        showtime.map((show: any) => {
          const date = new Date(show.dateTime);

          return (
            <Grid
              item
              key={show.theatre.id + show.dateTime}
              xs={12}
              sm={6}
              md={4}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {date.toLocaleString()}
                  </Typography>
                  <Typography>{show.theatre.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};
