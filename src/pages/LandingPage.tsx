import { useContext, useMemo, useState } from "react";

import { useFetchData } from "../hooks/useFetchData";

import { MainContent } from "../components/MainContent";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { getTodayDateISO } from "../utils/getTodaysDateISO";
import { getApiKeyContext } from "../store/api-key-context";

interface FetchData {
  isLoading?: boolean;
  data?: [] | undefined;
  error?: Error;
}

export const LandingPage = () => {
  const ApiKeyContextObj = useContext(getApiKeyContext());

  const baseUrl = process.env.REACT_APP_BASE_URL as string;
  const moviesTheatrePathName = process.env
    .REACT_APP_MOVIES_THEATRE_PATH_NAME as string;

  const [selectedDate, setSelectedDate] = useState(getTodayDateISO());
  const [zipcode, setZipcode] = useState(93035);

  const queryString = useMemo(() => {
    return {
      startDate: selectedDate,
      zip: zipcode.toString(),
      api_key: ApiKeyContextObj.apiKey,
    };
  }, [ApiKeyContextObj.apiKey, selectedDate, zipcode]);

  const url = ApiKeyContextObj.apiKey && zipcode && selectedDate ? baseUrl : "";

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
