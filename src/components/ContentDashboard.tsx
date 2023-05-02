import { Alert, LinearProgress, Snackbar } from '@mui/material';

import { ContentGallery, ContentItem } from './ContentGallery';

export const ContentDashboard = ({
  isLoading,
  contentItems,
}: {
  isLoading: boolean;
  contentItems: ContentItem[] | undefined;
}) => {
  return (
    <main>
      {isLoading && <LinearProgress />}
      {!isLoading && contentItems?.length && (
        <ContentGallery contentItems={contentItems} />
      )}
      <Snackbar open={!isLoading && !contentItems?.length}>
        <Alert sx={{ width: '100%' }} severity="error">
          No data found for this date and location
        </Alert>
      </Snackbar>
    </main>
  );
};
