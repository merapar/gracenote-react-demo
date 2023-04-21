import { FC, useContext, useMemo } from "react";

import { ApiKeyContext } from "../store/ApiKeyContext";
import { useLocationSelector } from "../App";
import { Navigation } from "../components/Navigation";

import { useGetLineupsQuery } from "../api/useGetLineupsQuery";
import { Lineups } from "../components/Lineups";
import { zipCodeLocationsMap } from "../components/LocationSelector";
import { AppDataContext } from "../store/AppDataContext";

export const MoviesOnTv: FC<{}> = () => {
  const { apiKeyValue } = useContext(ApiKeyContext);
  const { selectedDate } = useContext(AppDataContext);

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

  const cityName = zipCodeLocationsMap[currentZipCode];

  const { data: lineupData, isLoading: isLoadingLineup } =
    useGetLineupsQuery(queryString);

  return (
    <>
      <Navigation setZipCode={setZipCode} currentZipCode={currentZipCode} />

      {/* Limit the content to 1 type in a selected location */}
      <Lineups
        // data={lineupData?.filter((lineup) => lineup.location === cityName)}
        data={lineupData?.find((lineup) => lineup.location === cityName)}
        isLoading={isLoadingLineup}
      />
    </>
  );
};
