import { useState } from "react";
import { LinearProgress } from "@mui/material";

import { ErrorMessage } from "./ErrorMessage";
import { Shows } from "./Shows";
import { ShowDetails } from "./ShowDetails";
// import { Hero } from "./Hero";

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

interface MainContentData {
  isLoading: boolean | undefined;
  data: Show[] | undefined;
  error: Error | undefined;
}

export const MainContent = ({ isLoading, data, error }: MainContentData) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showId, setShowId] = useState<string>("");

  const showDetailsHandler = (selectedShowId: string) => {
    setShowId(selectedShowId);
    setShowDetails((state) => !state);
  };

  const selectedShow =
    showId && data ? data.filter((show: Show) => show.tmsId === showId) : "";

  let content;

  if (isLoading) content = <LinearProgress />;

  if (error) content = <ErrorMessage message={error.message} />;

  if (!isLoading && !data && !error) content = <div>NO DATA IS HERE</div>;

  if (data && !!data.length && !showDetails)
    content = (
      <>
        {/* <Hero imageUrl="https://source.unsplash.com/random" /> */}

        <Shows shows={data} showDetailsHandler={showDetailsHandler} />
      </>
    );

  if (data && !!data.length && showDetails && selectedShow)
    content = (
      <ShowDetails
        selectedShow={selectedShow}
        showDetailsHandler={showDetailsHandler}
      />
    );

  return <main>{content}</main>;
};
