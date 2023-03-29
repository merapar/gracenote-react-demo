import { useState } from "react";
import styled from "styled-components";

import { Title } from "./Title";
import { ShowDetails } from "./ShowDetails";

interface Show {
  tmsId: string;
  preferredImage: {
    uri: string;
  };
  title: string;
}

// interface AvailableShows extends Array<Show> {}

const MainContent = styled.main``;

const ShowShowsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media ((min-width: 768px)) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (((min-width: 1024px))) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  gap: 20px;
`;

const ShowDetailsContainer = styled.div`
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 20px;
`;

export const Shows = ({ shows }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showId, setShowId] = useState<string>("");

  const show = showId ? shows.filter((show: any) => show.tmsId === showId) : "";

  const content = showDetails ? (
    <ShowDetailsContainer>
      <ShowDetails setShowDetails={setShowDetails} show={show} />
    </ShowDetailsContainer>
  ) : (
    <ShowShowsContainer>
      {shows.map((show: Show) => {
        return (
          <Title
            key={show.tmsId}
            uri={show.preferredImage.uri}
            title={show.title}
            id={show.tmsId}
            setShowDetails={setShowDetails}
            setShowId={setShowId}
          />
        );
      })}
    </ShowShowsContainer>
  );

  return <MainContent>{content}</MainContent>;
};
