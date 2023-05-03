import { Container, Grid } from '@mui/material';

import ContentCard from './ContentCard';

export type ShowTime = {
  location: string;
  dateTime: string;
};

export type ContentItem = {
  tmsId: string;
  imageUri: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  showtimes: ShowTime[];
};

export const filterContentItemsPredicate = (
  item: ContentItem,
  index: number,
  items: ContentItem[],
) => {
  return items.findIndex((i) => i.tmsId === item.tmsId) === index;
};

export const ContentGallery = ({
  contentItems,
}: {
  contentItems: ContentItem[];
}) => {
  return (
    <Container sx={{ py: 4 }} maxWidth={false}>
      <Grid container spacing={4}>
        {contentItems?.map((item: ContentItem, index: number) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3} xl={2}>
            <ContentCard contentItem={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
