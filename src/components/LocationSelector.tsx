import styled from "styled-components";

const Locations = {
  // Oak Creek,
  WI: 53154,

  // East Meadow,
  NY: 11554,

  // Key West,
  FL: 33040,

  // Moorhead,
  MN: 56560,

  // Oxnard,
  CA: 93035,
};

const LocationDiv = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

type SetZipCodeShape = (zipCode: number) => void;

interface LocationParams {
  zipcode: number;
  setZipcode: SetZipCodeShape;
}

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  margin: 0.2rem;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.75;
  text-transform: uppercase;
  min-width: 6rem;
  padding: 5px 15px;
  border-radius: 4px;
  border: #000;
  color: #000;
  &.current {
    border: #fff;
    color: #fff;
    background-color: #000;
  }
`;

type RenderButtonParams = {
  stateShort: string;
  zipCode: number;
  currentZipCode: number;
  setZipCode: SetZipCodeShape;
};

const renderButton = ({
  stateShort,
  zipCode,
  setZipCode,
  currentZipCode,
}: RenderButtonParams) => {
  return (
    <Button
      onClick={() => {
        setZipCode(zipCode);
      }}
      key={stateShort}
      {...(currentZipCode === zipCode ? { className: "current" } : {})}
    >
      {stateShort}
    </Button>
  );
};

export const LocationSelector = ({
  zipcode: currentZipCode,
  setZipcode: setZipCode,
}: LocationParams) => {
  return (
    <LocationDiv>
      {Object.entries(Locations).map(([stateShort, zipCode]) =>
        renderButton({ stateShort, zipCode, setZipCode, currentZipCode })
      )}
    </LocationDiv>
  );
};
