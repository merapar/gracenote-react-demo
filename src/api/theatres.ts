import { request } from "./http/request";
import { API_URL } from "./http/url";
import { getAuthHeaders } from "./http/getAuthHeaders";

const THEATRES_URL = `${API_URL}/theatres`;

type ResponseTheater = {
  theatreId: string; // 	Resource identifier for theatre
  name: string; // 	Theatre name
  location: {
    distance: string; // 	Distance from center of postal code, or distance from coordinates; given in units specified by 'units' parameter.
    address: {
      street: string; // 	Street address, line 1
      street2: string; // 	Street address, line 2, if available
      city: string; // 	City
      state: string; // 	State abbreviation
      postalCode: string; // 	Postal code
      country: string; // 	USA or CAN
    };
  };
  telephone: string; // 	Telephone number, format XXX-XXX-XXXX
  geoCode: string; // 	Object containing the following:
  longitude: string; // 	Longitude coordinate of theatre
  latitude: string; // 	Latitude coordinate of theatre
};

type Params = {
  theatreId: string | number;
};

export const getTheatreRequest = async ({ theatreId }: Params) => {
  return await request(`${THEATRES_URL}/${theatreId}`, {
    queryParams: {
      ...getAuthHeaders(),
    },
  });
};
