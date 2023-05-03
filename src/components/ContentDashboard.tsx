import { Alert, Box, LinearProgress } from '@mui/material';

import { ContentGallery, ContentItem } from './ContentGallery';

export const ContentDashboard = ({
  isLoading,
  contentItems,
}: {
  isLoading: boolean;
  contentItems: ContentItem[];
}) => {
  return (
    <main>
      <LinearProgress
        sx={{ mt: 2, visibility: isLoading ? 'visible' : 'hidden' }}
      />
      <ContentGallery contentItems={contentItems} />
      {!isLoading && !contentItems.length && (
        <Box display={'flex'} justifyContent={'center'}>
          <Alert severity="error">
            No data found for this date and location
          </Alert>
        </Box>
      )}
    </main>
  );
};
