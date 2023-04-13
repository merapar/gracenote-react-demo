import { useState } from "react";
import { LinearProgress } from "@mui/material";

import { Shows } from "./Shows";
import { ShowDetails } from "./ShowDetails";
import { GetMoviesShowingsQueryResponseType } from "../api/useGetMoviesShowingsQuery";

interface MainContentProps {
  isLoading: boolean;
  moviesShowings: GetMoviesShowingsQueryResponseType | undefined;
}

export const MainContent = ({ isLoading, moviesShowings }: MainContentProps) => {

  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [movieId, setMovieId] = useState<string>("");

  const movieDetailsHandler = (selectedShowId: string) => {
    setMovieId(selectedShowId);
    setShowMovieDetails((state) => !state);
  };

  const selectedMovie = moviesShowings ? moviesShowings.filter((movie) => movie.tmsId === movieId) : "";

   return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && !moviesShowings  && <b>No movies found for your selected date</b>} {/* TODO: Add a better message */}
      {!isLoading && moviesShowings && !!moviesShowings.length && !showMovieDetails && (
        <Shows shows={moviesShowings} showDetailsHandler={movieDetailsHandler} />
      )}
      {!isLoading && moviesShowings && !!moviesShowings.length && showMovieDetails && selectedMovie && (
        <ShowDetails selectedShow={selectedMovie} showDetailsHandler={movieDetailsHandler} />
      )}
    </>
  );
};
