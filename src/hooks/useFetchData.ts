import { useEffect, useMemo, useState } from "react";

export const useFetchData = (
  baseUrl: string,
  pathName: string = "/",
  queryString?: Record<string, string>,
  options?: object
) => {
  console.log({ baseUrl, pathName, queryString, options });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const url = useMemo(() => {
    const urlObj = new URL(pathName, baseUrl);

    urlObj.search = new URLSearchParams(queryString ?? {}).toString();

    return urlObj.toString();
  }, [baseUrl, pathName, queryString]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    // const url = new URL(pathName, baseUrl);

    // url.search = new URLSearchParams(queryString ?? {}).toString();

    const fetchData = async () => {
      try {
        const response = await fetch(url, { ...(options ?? {}), signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const returnedData = await response.json();
        setIsLoading(false);
        setData(returnedData);
      } catch (error) {
        setIsLoading(false);
        setError(error as Error);
      }
    };
    fetchData();

    return () => abortController.abort();
    //   }, [baseUrl, options, pathName, queryString]);
  }, [options, url]);

  return { isLoading, data, error };
};
