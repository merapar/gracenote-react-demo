import { DateSelector } from "./DateSelector";
import { LocationSelector } from "./LocationSelector";

interface NavigationData {
  zipcode: any;
  setZipcode: any;
  setSelectedDate: any;
}

export const Navigation = ({
  zipcode,
  setZipcode,
  setSelectedDate,
}: NavigationData) => {
  return (
    <>
      <LocationSelector zipcode={zipcode} setZipcode={setZipcode} />
      <DateSelector setSelectedDate={setSelectedDate} />
    </>
  );
};
