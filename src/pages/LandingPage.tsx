// import { useMemo, useState } from "react";

// import { useFetchData } from "../hooks/useFetchData";

// export const LandingPage = () => {
//   const [zipcode, setZipcode] = useState("");

//   const sq = useMemo(() => {
//     return { foo: "bar" };
//   }, []);

//   const { isLoading, data, error } = useFetchData(
//     "https://httpbin.org",
//     "get",
//     sq,
//     { method: "GET" }
//   );

//   // const baseUrl = "http://data.tmsapi.com";
//   // const pathName = "v1.1/movies/showings";
//   // const params = useMemo(() => {
//   //   return {
//   //     startDate: startDate,
//   //     zip: zipcode,
//   //     api_key: process.env.API_KEY as string,
//   //   };
//   // }, [startDate, zipcode]);

//   return (
//     <div>
//       <p>{JSON.stringify(data)}</p>
//     </div>
//   );
// };

import { useMemo, useState } from "react";
import styled from "styled-components";

import { useFetchData } from "../hooks/useFetchData";

const Content = styled.div`
  background-color: aliceblue;
  top: 1rem;
`;

export const LandingPage = () => {
  const apiKey = process.env.REACT_APP_API_KEY as string;
  const baseUrl = process.env.REACT_APP_BASE_URL as string;
  const moviesTheatrePathName = process.env
    .REACT_APP_MOVIES_THEATRE_PATH_NAME as string;

  const [zipcode, setZipcode] = useState("49464");
  // const [queryString, setQueryString] = useState<Record<string, string>>();

  // let queryString: Record<string, string> = {};

  const now = new Date();
  const startDate =
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1).toLocaleString("en-UK", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    now.getDate();

  const queryString = useMemo(() => {
    return {
      startDate: startDate,
      zip: zipcode,
      api_key: apiKey,
    };
  }, [apiKey, startDate, zipcode]);

  const { isLoading, data, error } = useFetchData(
    baseUrl,
    moviesTheatrePathName,
    queryString
  );

  let result;

  if (isLoading) result = "Loading...";

  if (error) result = JSON.stringify(error);

  if (data) result = JSON.stringify(data);

  return (
    <Content>
      <h3>This is the Landing page.</h3>
      <select
        value={zipcode}
        onChange={(event) => {
          setZipcode(event.target.value);
        }}
      >
        <option value="49464">1</option>
        <option value="30075">2</option>
        <option value="60067">3</option>
        <option value="01886">4</option>
      </select>
      <div>{result}</div>
    </Content>
  );
};
