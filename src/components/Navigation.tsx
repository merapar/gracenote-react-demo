import { DateSelector } from "./DateSelector";

interface NavigationData {
  setSelectedDate: any;
}

export const Navigation = ({ setSelectedDate }: NavigationData) => {
  return (
    <>
      <DateSelector setSelectedDate={setSelectedDate} />
    </>
  );
};
