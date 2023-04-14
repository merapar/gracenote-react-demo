import { FC, useContext, useMemo, useState } from "react";
import { ApiKeyContext } from "../store/ApiKeyContext";
import dayjs, { Dayjs } from "dayjs";
import { useLocationSelector } from "../App";
import { Navigation } from "../components/Navigation";
import { useGetMoviesOnTvHook } from "./MoviesOnTv/useGetMoviesOnTvHook";
import { MoviesOnTVDatum } from "./MoviesOnTv/Movies";
import { MainContent, Show } from "../components/MainContent";

const movieToShowMapper = (movie: MoviesOnTVDatum): Show => {
  const {
    program: {
      longDescription,
      preferredImage,
      shortDescription,
      title,
      tmsId,
    },
    startTime,
    station,
  } = movie;
  return {
    longDescription,
    preferredImage,
    shortDescription,
    showtimes: [
      {
        theatre: { id: "", name: station.callSign },
        dateTime: startTime,
      },
    ],
    title,
    tmsId,
  };
};

export const MoviesOnTv: FC<{}> = () => {
  const { apiKeyValue } = useContext(ApiKeyContext);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const {
    locationSelector: { currentZipCode, setZipCode },
  } = useLocationSelector();

  const queryString = useMemo(() => {
    return {
      startDateTime: selectedDate?.format("YYYY-MM-DDTHH:mm[Z]") ?? "",
      postalCode: currentZipCode.toString(),
      api_key: apiKeyValue,
      country: "USA",
    };
  }, [selectedDate, currentZipCode, apiKeyValue]);

  const { isLoading, data, error } =
    useGetMoviesOnTvHook<MoviesOnTVDatum[]>(queryString);

  return (
    <>
      <Navigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setZipCode={setZipCode}
        currentZipCode={currentZipCode}
      />

      <MainContent
        isLoading={isLoading}
        data={data?.map(movieToShowMapper)}
        error={error}
      />
    </>
  );
};
