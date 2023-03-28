import { useEffect, useReducer } from "react";

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

export const useFetchData = <T = unknown>(
  baseUrl: string,
  pathName: string = "/",
  queryString?: Record<string, string>,
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
    if (!baseUrl) return;

    const abortController = new AbortController();
    const { signal } = abortController;

    const url = new URL(pathName, baseUrl);

    url.search = new URLSearchParams(queryString ?? {}).toString();

    const fetchData = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(url, { ...(options ?? {}), signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const returnedData = await response.json();

        dispatch({ type: "fetched", payload: returnedData });
      } catch (error) {
        dispatch({ type: "aborted" });
        if (!abortController.signal.aborted) {
          dispatch({ type: "error", payload: error as Error });
        }
      }
    };
    fetchData();

    return () => abortController.abort();
  }, [baseUrl, options, pathName, queryString]);

  return fetchDataState;
};
