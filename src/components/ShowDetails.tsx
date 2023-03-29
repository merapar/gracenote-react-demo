import styled from "styled-components";

const Details = styled.section``;

export const ShowDetails = ({ show, setShowDetails }: any) => {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  return (
    <Details onClick={() => setShowDetails(false)}>
      {show.map((show: any) => (
        <div key={show.tmsId}>
          <img
            src={`${imageBaseUrl}${show.preferredImage.uri}`}
            alt={show.title}
          />
          <h1>{show.title}</h1>
          <p>{show.longDescription}</p>
        </div>
      ))}
    </Details>
  );
};
