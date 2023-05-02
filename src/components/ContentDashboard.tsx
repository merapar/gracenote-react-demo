import { LinearProgress } from '@mui/material';

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
      {!isLoading && !contentItems && (
        <div>No data available for this date and location</div>
      )}
      {!isLoading && contentItems && (
        <ContentGallery contentItems={contentItems} />
      )}
    </main>
  );
};
