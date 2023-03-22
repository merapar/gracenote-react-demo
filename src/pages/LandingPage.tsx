import styled from "styled-components";

const Content = styled.div`
  background-color: aliceblue;
  top:1rem;
`;


export const LandingPage = () => {
  return (
    <Content>
      <h3>This is the Landing page.</h3>
      <p>Depending on the design, perhaps router to be added</p>
      <p>...</p>
    </Content>
  );
};
