import { Button, ListItem } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const Locations = {
  // East Meadow,
  "New York": 11554,

  // Oxnard,
  California: 93035,
};

export type SetZipCodeShape = (zipCode: number) => void;

interface LocationParams {
  currentZipCode: number;
  setZipCode: SetZipCodeShape;
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
  const showArrow = currentZipCode === zipCode;
  return (
    <ListItem
      disablePadding
      sx={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      key={state}
    >
      {showArrow && <NavigateNextIcon sx={{ transform: "translateX(3px)" }} />}
      <Button
        style={{
          margin: `.8rem 1.5rem .8rem ${showArrow ? 0 : "1.5rem"}`,
          width: "8rem",
        }}
        onClick={() => {
          setZipCode(zipCode);
        }}
        size={"large"}
        key={state}
        variant={"contained"}
      >
        {state}
      </Button>
    </ListItem>
  );
};

export const LocationSelector = ({
  currentZipCode,
  setZipCode,
}: LocationParams) => {
  return (
    <>
      {Object.entries(Locations).map(([state, zipCode]) =>
        renderButton({ state, zipCode, setZipCode, currentZipCode })
      )}
    </>
  );
};
