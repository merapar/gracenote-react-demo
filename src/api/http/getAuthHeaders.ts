export const getAuthHeaders = () => ({
  api_key: process.env.REACT_APP_API_KEY as string,
});
