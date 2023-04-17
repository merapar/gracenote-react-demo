import { FC, useContext, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MainContent } from "../components/MainContent";
import { Navigation } from "../components/Navigation";
import { useLocationSelector } from "../App";
import { ApiKeyContext } from "../store/ApiKeyContext";
import {
  GetMoviesShowingsQueryResponseType,
  useGetMoviesShowingsQuery,
} from "../api/useGetMoviesShowingsQuery";

interface FetchData {
  isLoading?: boolean;
  data?: GetMoviesShowingsQueryResponseType;
}

export const MoviesOnCinema: FC<{}> = () => {
  const { apiKeyValue } = useContext(ApiKeyContext);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const {
    locationSelector: { currentZipCode, setZipCode },
  } = useLocationSelector();

  const queryString = useMemo(() => {
    return {
      startDate: selectedDate?.format("YYYY-MM-DD") ?? "",
      zip: currentZipCode,
      api_key: apiKeyValue,
    };
  }, [selectedDate, currentZipCode, apiKeyValue]);

  const { isLoading, data }: FetchData = useGetMoviesShowingsQuery(queryString);

  return (
    <>
      <Navigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setZipCode={setZipCode}
        currentZipCode={currentZipCode}
      />

      <MainContent isLoading={isLoading} data={data} />
    </>
  );
};
