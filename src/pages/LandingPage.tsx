import { useContext, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { useFetchData } from "../hooks/useFetchData";
import { MainContent } from "../components/MainContent";
import { Navigation } from "../components/Navigation";
import { useLocationSelector } from "../App";
import { ApiKeyContext } from "../store/ApiKeyContext";

interface FetchData {
  isLoading?: boolean;
  data?: [] | undefined;
  error?: Error;
}

export const LandingPage = () => {
  const { apiKeyValue } = useContext(ApiKeyContext);
  const baseUrl = process.env.REACT_APP_BASE_URL as string;
  const moviesTheatrePathName = process.env
    .REACT_APP_MOVIES_THEATRE_PATH_NAME as string;

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const {
    locationSelector: { currentZipCode, setZipCode },
  } = useLocationSelector();

  const queryString = useMemo(() => {
    return {
      startDate: selectedDate?.format("YYYY-MM-DD") ?? "",
      zip: currentZipCode.toString(),
      api_key: apiKeyValue,
    };
  }, [selectedDate, currentZipCode, apiKeyValue]);

  const url = apiKeyValue && currentZipCode && selectedDate ? baseUrl : "";

  const { isLoading, data, error }: FetchData = useFetchData(
    url,
    moviesTheatrePathName,
    queryString
  );
  return (
    <>
      <Navigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setZipCode={setZipCode}
        currentZipCode={currentZipCode}
      />

      <MainContent isLoading={isLoading} data={data} error={error} />
    </>
  );
};
