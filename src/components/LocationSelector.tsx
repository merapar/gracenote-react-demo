import styled from "styled-components";
import Button from "@mui/material/Button";

const Locations = {
  // Oak Creek,
  WI: 53154,

  // East Meadow,
  NY: 11554,

  // Key West,
  FL: 33040,

  // Moorhead,
  MN: 56560,

  // Oxnard,
  CA: 93035,
};

const LocationDiv = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 520px) {
    flex-direction: column;
  }
  .MuiButton-root {
    margin: 1rem;
  }
`;

type SetZipCodeShape = (zipCode: number) => void;

interface LocationParams {
  zipcode: number;
  setZipcode: SetZipCodeShape;
}

type RenderButtonParams = {
  stateShort: string;
  zipCode: number;
  currentZipCode: number;
  setZipCode: SetZipCodeShape;
};

const renderButton = ({
  stateShort,
  zipCode,
  setZipCode,
  currentZipCode,
}: RenderButtonParams) => {
  return (
    <Button
      onClick={() => {
        setZipCode(zipCode);
      }}
      size={"large"}
      key={stateShort}
      {...(currentZipCode === zipCode
        ? { variant: "outlined", color: "secondary" }
        : { variant: "contained" })}
    >
      {stateShort}
    </Button>
  );
};

export const LocationSelector = ({
  zipcode: currentZipCode,
  setZipcode: setZipCode,
}: LocationParams) => {
  return (
    <LocationDiv>
      {Object.entries(Locations).map(([stateShort, zipCode]) =>
        renderButton({ stateShort, zipCode, setZipCode, currentZipCode })
      )}
    </LocationDiv>
  );
};
