import { Title } from "./Title";

interface Show {
  tmsId: string;
  preferredImage: {
    uri: string;
  };
  title: string;
}

// interface AvailableShows extends Array<Show> {}

export const Shows = ({ shows }: any) => {
  const content = shows.map((show: Show) => {
    return (
      <Title
        key={show.tmsId}
        uri={show.preferredImage.uri}
        title={show.title}
      />
    );
  });

  return <div>{content}</div>;
};
