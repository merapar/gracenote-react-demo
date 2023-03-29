import { API_URL } from "./http/url";
import { request } from "./http/request";
import { getAuthHeaders } from "./http/getAuthHeaders";

const MOVIES_SHOWINGS_URL = `${API_URL}/movies/showings`;

type Params = {
  zipCode: string;
  startDate: string;
};

export const moviesShowingsByPostalCodeRequest = async ({
  zipCode,
  startDate,
}: Params) => {
  return await request(MOVIES_SHOWINGS_URL, {
    queryParams: {
      startDate,
      zip: zipCode,
      ...getAuthHeaders(),
    },
  });
};
