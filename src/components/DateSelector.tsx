interface SelectDateParams {
  selectedDate: string;
  setSelectedDate: Function;
}

export const DateSelector = ({ selectedDate, setSelectedDate }: SelectDateParams) => {
  const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setSelectedDate(event.target.value);
      return;
    }
    setSelectedDate("");
  };

  return (
    <div>
      <input type="date" onChange={dateHandler} value={selectedDate} />
    </div>
  );
};
