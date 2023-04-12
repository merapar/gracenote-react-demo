import { Button, styled } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "./Box";
import { Label } from "./Label";
import { FC } from "react";

export const Locations = {
  // East Meadow,
  "New York": 11554,

  // Oxnard,
  "Los Angeles": 90210,
};

export type SetZipCodeShape = (zipCode: number) => void;

type Props = {
  currentZipCode: number;
  setZipCode: SetZipCodeShape;
};

type RenderButtonParams = {
  state: string;
  zipCode: number;
  currentZipCode: number;
  setZipCode: SetZipCodeShape;
};

const StateSelectionArrow = styled(NavigateNextIcon)(({ theme }) => ({
  color: theme.palette.background.paper,
  transform: "translateX(3px)",
}));

const renderButton = ({
  state,
  zipCode,
  setZipCode,
  currentZipCode,
}: RenderButtonParams) => {
  const showArrow = currentZipCode === zipCode;
  return (
    <Box flexDirection={"row"} key={state} alignItems={"center"}>
      {showArrow && <StateSelectionArrow />}
      <Button
        style={{
          margin: `.8rem .5rem .8rem ${showArrow ? 0 : "1.5rem"}`,
          width: "9rem",
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
    </Box>
  );
};

export const LocationSelector: FC<Props> = ({ currentZipCode, setZipCode }) => {
  return (
    <Box flexDirection={"row"}>
      <Label variant="h4">
        <span>Choose location</span>
      </Label>
      {Object.entries(Locations).map(([state, zipCode]) =>
        renderButton({ state, zipCode, setZipCode, currentZipCode })
      )}
    </Box>
  );
};
