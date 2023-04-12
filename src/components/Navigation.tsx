import { DateSelector } from "./DateSelector";
import { LocationSelector } from "./LocationSelector";
import { FC } from "react";
import { Box } from "./Box";

type Props = {
  setSelectedDate: any;
  currentZipCode: any;
  setZipCode: any;
  selectedDate: string;
};

export const Navigation: FC<Props> = ({
  setSelectedDate,
  currentZipCode,
  setZipCode,
  selectedDate,
}) => {
  return (
    <Box flexDirection={"row"} justifyContent={"center"}>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div style={{ width: "4rem" }}></div>
      <LocationSelector
        currentZipCode={currentZipCode}
        setZipCode={setZipCode}
      />
    </Box>
  );
};
