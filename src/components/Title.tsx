import styled from "styled-components";

interface TitleParams {
  title: string;
  uri: string;
}

const DivImage = styled.div`
  display: inline-block;
  border: 1px solid grey;
  background: silver;
  padding: 4px;
  text-align: center;
  font-size: 15px;
  width: 250px;
`;

export const Title = ({ title, uri }: TitleParams) => {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  return (
    <DivImage>
      <img src={`${imageBaseUrl}${uri}`} alt={title} />
      <br />
      {title}
    </DivImage>
  );
};
