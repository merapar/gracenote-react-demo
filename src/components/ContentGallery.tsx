import { FC } from 'react';
import { Container, Grid } from '@mui/material';

import ContentCard from './ContentCard';
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
              <ContentCard
                contentItem={item}
                showDetailsHandler={showDetailsHandler}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};
