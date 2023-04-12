import { DateSelector } from "./DateSelector";
import { LocationSelector } from "./LocationSelector";
import { Dispatch, FC, SetStateAction } from "react";
import { Box } from "./Box";
import { Dayjs } from "dayjs";

type Props = {
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
  currentZipCode: number;
  setZipCode: Dispatch<SetStateAction<number>>;
  selectedDate: Dayjs | null;
};

export const Navigation: FC<Props> = ({
  setSelectedDate,
  currentZipCode,
  setZipCode,
  selectedDate,
}) => {
  console.log({ selectedDate });
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
