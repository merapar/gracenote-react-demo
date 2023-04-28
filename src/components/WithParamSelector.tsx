import { Outlet } from 'react-router-dom';
import { ParamSelector } from './ParamSelector';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export default function WithParamSelector() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [zipCode, setZipCode] = useState<number>(11554);

  return (
    <div>
      <ParamSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        zipCode={zipCode}
        setZipCode={setZipCode}
      />
      <Outlet context={[selectedDate, zipCode]} />
    </div>
  );
}
