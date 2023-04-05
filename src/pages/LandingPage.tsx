import { useMemo, useState } from "react";

import { useFetchData } from "../hooks/useFetchData";

import { MainContent } from "../components/MainContent";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { getTodayDateISO } from "../utils/getTodaysDateISO";

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
  const [zipcode, setZipcode] = useState(93035);

  const queryString = useMemo(() => {
    return {
      startDate: selectedDate,
      zip: zipcode.toString(),
      api_key: apiKey,
    };
  }, [apiKey, selectedDate, zipcode]);

  const url = zipcode && selectedDate ? baseUrl : "";

  const { isLoading, data, error }: FetchData = useFetchData(
    url,
    moviesTheatrePathName,
    queryString
  );

  return (
    <>
      <Navigation
        zipcode={zipcode}
        setZipcode={setZipcode}
        setSelectedDate={setSelectedDate}
      />

      <MainContent isLoading={isLoading} data={data} error={error} />

      <Footer />
    </>
  );
};
