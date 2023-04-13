import { FC, useContext, useState } from "react";
import { getApiKeyContext } from "../store/api-key-context";
import dayjs, { Dayjs } from "dayjs";
import { useLocationSelector } from "../App";
import { Navigation } from "../components/Navigation";

export const MoviesOnTv: FC<{}> = () => {
  const ApiKeyContextObj = useContext(getApiKeyContext());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const {
    locationSelector: { currentZipCode, setZipCode },
  } = useLocationSelector();
  return (
    <>
      <Navigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setZipCode={setZipCode}
        currentZipCode={currentZipCode}
      />
    </>
  );
};
