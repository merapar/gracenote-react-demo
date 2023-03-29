interface SelectDateParams {
  setSelectedDate: Function;
}

export const DateSelector = ({ setSelectedDate }: SelectDateParams) => {
  const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setSelectedDate(event.target.value);
      return;
    }
    setSelectedDate("");
  };

  return (
    <div>
      <input type="date" onChange={dateHandler} />
    </div>
  );
};
