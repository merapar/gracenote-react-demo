import styled from "styled-components";

interface TitleParams {
  title: string;
  uri: string;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setShowId: Function;
  id: string;
}

const DivImage = styled.div`
  display: inline-block;
  border: 1px solid grey;
  background: silver;
  padding: 4px;
  text-align: center;
  font-size: 15px;
  width: 250px;

  margin: auto;

  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = ({
  title,
  uri,
  setShowDetails,
  setShowId,
  id,
}: TitleParams) => {
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  const clickHandler = () => {
    setShowId(id);
    setShowDetails(true);
  };

  return (
    <DivImage onClick={clickHandler}>
      <img src={`${imageBaseUrl}${uri}`} alt={title} />
      <br />
      {title}
    </DivImage>
  );
};
