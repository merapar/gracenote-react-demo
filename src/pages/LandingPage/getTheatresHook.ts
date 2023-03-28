import { useEffect, useState } from "react";
import { theatresByPostalCodeRequest } from "../../api/theatres";

type Params = {
  mapper?: Array<any>["map"];
  limit?: number;
  zipCode: string;
  startDate: string;
};
const defaultLimit = 10;
const defaultMapper = (_: any) => _;

export const getTheatresHook = (params: Params) => {
  const limit = params.limit ?? defaultLimit;
  const mapper = params.mapper ?? defaultMapper;

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const response = await theatresByPostalCodeRequest({
        zipCode: params.zipCode,
        startDate: params.startDate,
      });
      if (response?.ok) {
        const responseJson = await response.json();
        setData(responseJson);
      }
      setIsFetching(false);
    };

    fetchData();
  });
  return { isFetching, data: data.map(mapper) };
};
