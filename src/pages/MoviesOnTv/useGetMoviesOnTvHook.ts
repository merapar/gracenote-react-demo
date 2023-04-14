import { useEffect, useReducer } from "react";
import { zipCodeLocationsMap } from "../../components/LocationSelector";
const baseUrl = process.env.REACT_APP_BASE_URL as string;
const lineupsPathName = process.env.REACT_APP_LINEUPS_PATH_NAME as string;
const moviesTvPathName = process.env.REACT_APP_MOVIES_TV_PATH_NAME as string;
interface State<T> {
  isLoading?: boolean;
  data?: T;
  error?: Error;
}

type Action<T> =
  | { type: "loading" }
  | { type: "aborted" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

const initialState = {
  isLoadin: false,
  data: undefined,
  error: undefined,
};
type LineupObj = {
  type: string;
  device: string;
  lineupId: string;
  name: string;
  location: string;
  mso: {
    id: string;
    name: string;
  };
};

const getLineupForCity =
  (cityName: string) =>
  (lineupObjs: LineupObj[]): LineupObj | void => {
    return lineupObjs.find((value) => value.location === cityName);
  };
export const useGetMoviesOnTvHook = <T = unknown>(
  queryString: Record<
    "startDateTime" | "postalCode" | "api_key" | "country",
    string
  >,
  options?: object
): State<T> => {
  const fetchDataReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "aborted":
        return { ...initialState, isLoading: false };

      case "loading":
        return { ...initialState, isLoading: true };

      case "fetched":
        return { ...initialState, data: action.payload };

      case "error":
        return { ...initialState, error: action.payload };

      default:
        return state;
    }
  };

  const [fetchDataState, dispatch] = useReducer(fetchDataReducer, initialState);

  useEffect(() => {
    if (!baseUrl) {
      dispatch({ type: "aborted" });
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    const { postalCode, country, api_key, startDateTime } = queryString;

    const urlLineups = new URL(lineupsPathName, baseUrl);
    const urlMoviesOnTV = new URL(moviesTvPathName, baseUrl);

    const search = new URLSearchParams({
      postalCode,
      country,
      api_key,
    });

    urlLineups.search = search.toString();

    const fetchData = async () => {
      dispatch({ type: "loading" });
      try {
        const lineupResponse = await fetch(urlLineups, {
          ...(options ?? {}),
          signal,
        });
        if (!lineupResponse.ok) {
          throw new Error(lineupResponse.statusText);
        }
        const lineupsData = await lineupResponse.json();
        const cityName = zipCodeLocationsMap[postalCode];
        const lineupObj = getLineupForCity(cityName)(lineupsData);
        if (!lineupObj) {
          throw new Error("Missing Lineup for current location");
        }
        search.delete("postalCode");
        search.delete("country");
        search.append("lineupId", lineupObj.lineupId);
        search.append("startDateTime", startDateTime);
        urlMoviesOnTV.search = search.toString();
        const moviesOnTVResponse = await fetch(urlMoviesOnTV, {
          ...(options ?? {}),
          signal,
        });
        const moviesOnTVData = await moviesOnTVResponse.json();
        dispatch({ type: "fetched", payload: moviesOnTVData });
      } catch (error) {
        dispatch({ type: "aborted" });
        if (!abortController.signal.aborted) {
          dispatch({ type: "error", payload: error as Error });
        }
      }
    };
    fetchData();

    return () => abortController.abort();
  }, [options, queryString]);

  return fetchDataState;
};
