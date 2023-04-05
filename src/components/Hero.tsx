import { Box, Container, CardMedia } from "@mui/material";

interface HeroData {
  imageUrl: string;
}

export const Hero = ({ imageUrl }: HeroData) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <CardMedia component="img" image={imageUrl} alt="random" />
      </Container>
    </Box>
  );
};
