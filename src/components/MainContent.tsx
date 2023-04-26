import { useState } from 'react';
import { LinearProgress } from '@mui/material';

import { ContentGallery, ContentItem } from './ContentGallery';
import { ShowDetails } from './ShowDetails';

export const MainContent = ({
  isLoading,
  contentItems,
}: {
  isLoading: boolean;
  contentItems: ContentItem[] | undefined;
}) => {
  const [contentDetails, setContentDetails] = useState(false);
  const [contentId, setContentId] = useState<string>('');

  const contentDetailsHandler = (selectedShowId: string) => {
    setContentId(selectedShowId);
    setContentDetails((state) => !state);
  };

  const selectedContentItem =
    contentId && contentItems
      ? contentItems.filter((item: ContentItem) => item.tmsId === contentId)
      : '';

  return (
    <main>
      {isLoading && <LinearProgress />}
      {!isLoading && !contentItems && <div>NO DATA IS HERE</div>}
      {contentItems && !!contentItems.length && !contentDetails && (
        <ContentGallery
          contentItems={contentItems}
          showDetailsHandler={contentDetailsHandler}
        />
      )}
      {contentItems &&
        !!contentItems.length &&
        contentDetails &&
        selectedContentItem && (
          <ShowDetails
            selectedShow={selectedContentItem}
            showDetailsHandler={contentDetailsHandler}
          />
        )}
    </main>
  );
};
