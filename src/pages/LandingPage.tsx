import { useMemo, useState } from "react";

import { useFetchData } from "../hooks/useFetchData";

import { MainContent } from "../components/MainContent";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { getTodayDateISO } from "../utils/getTodaysDateISO";
import { useLocationSelector } from "../App";

interface FetchData {
  isLoading?: boolean;
  data?: [] | undefined;
  error?: Error;
}

export const LandingPage = () => {
  const apiKey = process.env.REACT_APP_API_KEY as string;
  const baseUrl = process.env.REACT_APP_BASE_URL as string;
  const moviesTheatrePathName = process.env
    .REACT_APP_MOVIES_THEATRE_PATH_NAME as string;

  const [selectedDate, setSelectedDate] = useState(getTodayDateISO());
  const {
    locationSelector: { currentZipCode },
  } = useLocationSelector();

  const queryString = useMemo(() => {
    return {
      startDate: selectedDate,
      zip: currentZipCode.toString(),
      api_key: apiKey,
    };
  }, [apiKey, selectedDate, currentZipCode]);

  const url = currentZipCode && selectedDate ? baseUrl : "";

  const { isLoading, data, error }: FetchData = useFetchData(
    url,
    moviesTheatrePathName,
    queryString
  );

  return (
    <>
      <Navigation setSelectedDate={setSelectedDate} />

      <MainContent isLoading={isLoading} data={data} error={error} />

      <Footer />
    </>
  );
};