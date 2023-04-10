import { useState } from "react";

import { MainContent } from "../components/MainContent";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { getTodayDateISO } from "../utils/getTodaysDateISO";
import useGetMoviesShowings from "../api/useGetMoviesShowingsQuery";


export const LandingPage = () => {

  const [selectedDate, setSelectedDate] = useState(getTodayDateISO());
  const [zipcode, setZipcode] = useState(93035);

  const { data: moviesShowings, isLoading } = useGetMoviesShowings({ zip: zipcode, startDate: selectedDate });

  return (
    <>
      <Navigation
        zipcode={zipcode}
        setZipcode={setZipcode}
        setSelectedDate={setSelectedDate}
      />

      <MainContent isLoading={isLoading} moviesShowings={moviesShowings} />

      <Footer />
    </>
  );
};
