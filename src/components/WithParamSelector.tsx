import { Outlet, useOutletContext } from 'react-router-dom';
import { ParamSelector, ParamSelectorPropsType } from './ParamSelector';

export default function WithParamSelector() {
  const { selectedDate, setSelectedDate, zipCode, setZipCode } =
    useOutletContext<ParamSelectorPropsType>();

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
