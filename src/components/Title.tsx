import styled from "styled-components";

const DivImage = styled.div`
  display: inline-block;
  border: 1px solid grey;
  background: silver;
  padding: 4px;
  text-align: center;
  font-size: 15px;
  width: 250px;
`;

export const Title = ({ show }: any) => {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  return (
    <DivImage>
      <img
        src={`${imageBaseUrl}${show.preferredImage?.uri}`}
        alt={show.title}
      />
      <br />
      {show.title}
    </DivImage>
  );
};
