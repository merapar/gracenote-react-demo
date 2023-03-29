import styled from "styled-components";

const ErrorDiv = styled.div`
  background-color: #e94e4e;
  top: 1rem;
`;

interface ErrorData {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorData) => {
  return <ErrorDiv>{message}</ErrorDiv>;
};
