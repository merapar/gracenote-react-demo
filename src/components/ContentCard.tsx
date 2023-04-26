import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ContentItem } from './ContentGallery';
import { IMAGE_BASE_URL } from '../api';

const ContentCard = ({
  contentItem,
  showDetailsHandler,
}: {
  contentItem: ContentItem;
  showDetailsHandler: (selectedShowId: string) => void;
}) => {
  return (
    <CardActionArea
      onClick={() => showDetailsHandler(contentItem.tmsId)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          image={`${IMAGE_BASE_URL}${contentItem.imageUri}`}
          alt={contentItem.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {contentItem.title}
          </Typography>
          <Typography>{contentItem.shortDescription}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default ContentCard;
