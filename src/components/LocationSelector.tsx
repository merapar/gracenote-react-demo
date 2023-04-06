import { Button } from "@mui/material";

const Locations = {
  // Oak Creek,
  // WI: 53154,

  // East Meadow,
  "New York": 11554,

  // Key West,
  // FL: 33040,

  // Moorhead,
  // MN: 56560,

  // Oxnard,
  California: 93035,
};

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
      style={{ margin: "1rem" }}
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {Object.entries(Locations).map(([stateShort, zipCode]) =>
        renderButton({ stateShort, zipCode, setZipCode, currentZipCode })
      )}
    </div>
  );
};
