import { useContext, useState } from "react";
import { LinearProgress } from "@mui/material";

import { ContentGallery } from "./ContentGallery";
import { ShowDetails } from "./ShowDetails";
import { AppDataContext } from "../store/AppDataContext";
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

// interface MainContentData {
//   isLoading: boolean | undefined;
//   data: Show[] | undefined;
// }

// interface FetchData {
//   isLoading: boolean;
//   data: GetMoviesShowingsQueryResponseType;
// }

export const MainContent = ({ isLoading, data }: any) => {
  const { showContentDetails, onToggleShowContentDetails } =
    useContext(AppDataContext);
  const [showId, setShowId] = useState<string>("");

  const showDetailsHandler = (selectedShowId: string) => {
    setShowId(selectedShowId);
    onToggleShowContentDetails();
  };

  const selectedShow =
    showId && data ? data.filter((show: Show) => show.tmsId === showId) : "";

  let content;

  if (isLoading) content = <LinearProgress />;

  if (!isLoading && !data) content = <div>NO DATA IS HERE</div>;

  if (data && !!data.length && !showContentDetails)
    content = (
      <>
        {/* <Hero imageUrl="https://source.unsplash.com/random" /> */}

        <ContentGallery shows={data} showDetailsHandler={showDetailsHandler} />
      </>
    );

  // if (data && !!data.length && showDetails && selectedShow)
  if (data && !!data.length && showContentDetails && selectedShow)
    content = (
      <ShowDetails
        selectedShow={selectedShow}
        showDetailsHandler={showDetailsHandler}
      />
    );

  return <main>{content}</main>;
};
