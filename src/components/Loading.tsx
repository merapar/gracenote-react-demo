import styled, { keyframes } from "styled-components";

const SpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #dfc;
    border-color: #dfc transparent #dfc transparent;
    animation: ${SpinnerAnimation} 1.2s linear infinite;
  }
`;

export const Loading = () => {
  return <Spinner />;
};
