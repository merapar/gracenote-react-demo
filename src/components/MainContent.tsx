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
      {moviesShowings && !!moviesShowings.length && !showMovieDetails && (
        <Shows shows={moviesShowings} showDetailsHandler={movieDetailsHandler} />
      )}
      {moviesShowings && !!moviesShowings.length && showMovieDetails && selectedMovie && (
        <ShowDetails selectedShow={selectedMovie} showDetailsHandler={movieDetailsHandler} />
      )}
    </>
  );
};
