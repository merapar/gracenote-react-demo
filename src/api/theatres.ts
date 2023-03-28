import { request } from "./http/request";
import { API_URL } from "./http/url";

const ON_API_KEY = "sm62qj2z9t43spub2mg22stu";
const ON_CONNECT_KEY = "44vyhctscd4p7ahf69b8drag";

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
  zipCode: string;
  startDate: string;
};

export const theatresByPostalCodeRequest = async ({
  zipCode,
  startDate,
}: Params) => {
  return await request(THEATERS_URL, {
    queryParams: {
      startDate,
      zip: zipCode,
      api_key: ON_CONNECT_KEY,
    },
  });
};
