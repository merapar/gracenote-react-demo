import { Container, GlobalStyles, Link, Typography } from '@mui/material';
import { Box } from '../components/Box';

const MakeSureTheFooterIsVisible = () => (
  <GlobalStyles
    styles={{
      '#root': {
        height: '100vh',
      },
      '#app-container': {
        height: '100%',
      },
      '#app-outlet': {
        height: '100%',
      },
    }}
  />
);

export const AboutPage = () => {
  return (
    <Container sx={{ py: 8, height: '100%' }} maxWidth={false}>
      <MakeSureTheFooterIsVisible />
      <Box
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ height: '100%' }}
      >
        <Typography
          fontSize={'1.5rem'}
          lineHeight={'2.5rem'}
          width={0.5}
          color={'#fff'}
          variant="body1"
          gutterBottom
        >
          This Gracenote API demo has been built by Merapar engineers. If you
          need help integrating Gracenote APIs you can contact us here{' '}
          <Link href={'https://merapar.com/contact/'}>
            https://merapar.com/contact/
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
