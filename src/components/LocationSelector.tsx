import styled from "styled-components";

export enum Locations {
  // Oak Creek,
  WI = 53154,

  // East Meadow,
  NY = 11554,

  // Key West,
  FL = 33040,

  // Moorhead,
  MN = 56560,

  // Oxnard,
  CA = 93035,
}

const LocationDiv = styled.div``;

interface LocationParams {
  zipcode: number;
  setZipcode: Function;
}

export const LocationSelector = ({ zipcode, setZipcode }: LocationParams) => {
  return (
    <LocationDiv>
      <select
        value={zipcode}
        onChange={(event) => {
          setZipcode(event.target.value);
        }}
      >
        <option value=""></option>
        <option value={Locations.CA}>CA</option>
        <option value={Locations.FL}>FL</option>
        <option value={Locations.MN}>MN</option>
        <option value={Locations.NY}>NY</option>
        <option value={Locations.WI}>WI</option>
      </select>
    </LocationDiv>
  );
};
