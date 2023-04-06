import { Button } from "@mui/material";

const Locations = {
  // East Meadow,
  "New York": 11554,

  // Oxnard,
  California: 93035,
};

type SetZipCodeShape = (zipCode: number) => void;

interface LocationParams {
  zipcode: number;
  setZipcode: SetZipCodeShape;
}

type RenderButtonParams = {
  state: string;
  zipCode: number;
  currentZipCode: number;
  setZipCode: SetZipCodeShape;
};

const renderButton = ({
  state,
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
      key={state}
      {...(currentZipCode === zipCode
        ? { variant: "outlined", color: "secondary" }
        : { variant: "contained" })}
    >
      {state}
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
      {Object.entries(Locations).map(([state, zipCode]) =>
        renderButton({ state, zipCode, setZipCode, currentZipCode })
      )}
    </div>
  );
};
