import dayjs, { Dayjs } from 'dayjs';
import { createContext, useState } from 'react';

export const AppDataContext = createContext({
  showContentDetails: false,
  onToggleShowContentDetails: () => {},
  onResetShowContentDetails: () => {},
  selectedDate: dayjs(),
  onSetSelectedDate: (value: Dayjs) => {},
});

export const AppDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const toggleShowContentDetails = () => {
    setShowDetails((state) => !state);
  };

  const resetShowContentDetails = () => {
    setShowDetails(false);
  };

  const updateSelectedDate = (value: Dayjs) => {
    setSelectedDate(value);
  };

  return (
    <AppDataContext.Provider
      value={{
        showContentDetails: showDetails,
        onToggleShowContentDetails: toggleShowContentDetails,
        onResetShowContentDetails: resetShowContentDetails,
        selectedDate: selectedDate,
        onSetSelectedDate: updateSelectedDate,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
