interface ErrorData {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorData) => {
  return (
    <div style={{ backgroundColor: "#e94e4e;", top: "1rem;" }}>{message}</div>
  );
};
