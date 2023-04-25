import { useState } from 'react';
import { LinearProgress } from '@mui/material';

import { ContentGallery } from './ContentGallery';
import { ShowDetails } from './ShowDetails';

interface TheatreData {
  id: string;
  name: string;
}

interface TimeAndLocationData {
  theatre: TheatreData;
  dateTime: string;
}

export interface ShowTimesData {
  showtimes: TimeAndLocationData[];
}

interface PreferredImage {
  uri: string;
}

export interface Show {
  tmsId: string;
  preferredImage: PreferredImage;
  title: string;
  shortDescription: string;
  longDescription: string;
  showtimes: TimeAndLocationData[];
}

export const MainContent = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showId, setShowId] = useState<string>('');

  const showDetailsHandler = (selectedShowId: string) => {
    setShowId(selectedShowId);
    setShowDetails((state) => !state);
  };

  const selectedShow =
    showId && data ? data.filter((show: Show) => show.tmsId === showId) : '';

  return (
    <main>
      {isLoading && <LinearProgress />}
      {!isLoading && !data && <div>NO DATA IS HERE</div>}
      {data && !!data.length && !showDetails && (
        <ContentGallery shows={data} showDetailsHandler={showDetailsHandler} />
      )}
      {data && !!data.length && showDetails && selectedShow && (
        <ShowDetails
          selectedShow={selectedShow}
          showDetailsHandler={showDetailsHandler}
        />
      )}
    </main>
  );
};
