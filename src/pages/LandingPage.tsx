import { FC, useContext, useMemo, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { MainContent } from "../components/MainContent";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useLocationSelector } from "../App";
import { getApiKeyContext } from "../store/api-key-context";
import dayjs, { Dayjs } from "dayjs";

interface FetchData {
  isLoading?: boolean;
  data?: [] | undefined;
  error?: Error;
}

export const LandingPage: FC<{}> = () => {
  const ApiKeyContextObj = useContext(getApiKeyContext());

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
      api_key: ApiKeyContextObj.apiKey,
    };
  }, [ApiKeyContextObj.apiKey, selectedDate, currentZipCode]);

  const url =
    ApiKeyContextObj.apiKey && currentZipCode && selectedDate ? baseUrl : "";

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

      <Footer />
    </>
  );
};
