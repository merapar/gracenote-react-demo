import { useMemo, useState } from "react";
import styled from "styled-components";

import { useFetchData } from "../hooks/useFetchData";

import { ErrorMessage } from "../components/ErrorMessage";
import { LocationSelector } from "../components/LocationSelector";
import { Loading } from "../components/Loading";
import { DateSelector } from "../components/DateSelector";
import { Shows } from "../components/Shows";

interface FetchData {
  isLoading?: boolean;
  data?: [] | undefined;
  error?: Error;
}

const Container = styled.div`
  background-color: aliceblue;
  top: 1rem;
`;

const NoShows = styled.div`
  background-color: pink;
  top: 1rem;
`;

export const LandingPage = () => {
  const apiKey = process.env.REACT_APP_API_KEY as string;
  const baseUrl = process.env.REACT_APP_BASE_URL as string;
  const moviesTheatrePathName = process.env
    .REACT_APP_MOVIES_THEATRE_PATH_NAME as string;

  const [selectedDate, setSelectedDate] = useState("");
  const [zipcode, setZipcode] = useState(0);

  const queryString = useMemo(() => {
    return {
      startDate: selectedDate,
      zip: zipcode.toString(),
      api_key: apiKey,
    };
  }, [apiKey, selectedDate, zipcode]);

  const url = zipcode && selectedDate ? baseUrl : "";

  const {
    isLoading,
    data: shows,
    error,
  }: FetchData = useFetchData(url, moviesTheatrePathName, queryString);

  return (
    <Container>
      <LocationSelector zipcode={zipcode} setZipcode={setZipcode} />
      <DateSelector setSelectedDate={setSelectedDate} />

      {isLoading && <Loading />}

      {error && <ErrorMessage message={error.message} />}

      {shows && !!shows.length && <Shows shows={shows} />}

      {!isLoading && !error && !shows && (
        <NoShows>
          {baseUrl ? "Please Select Date and/or Location" : "No Shows Found!"}
        </NoShows>
      )}
    </Container>
  );
};
