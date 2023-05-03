import { FormControlLabel, Radio, Stack } from '@mui/material';
import { Label } from './Label';

export const Locations = {
  // East Meadow,
  'New York': 11554,

  // Oxnard,
  'Los Angeles': 90210,
};

export const zipCodeLocationsMap = Object.fromEntries(
  Object.entries(Locations).map((location) => location.reverse()),
);

type RenderButtonParams = {
  city: string;
  zipCode: number;
  selectedZipCode: number;
  setSelectedZipCode: (zipCode: number) => void;
};

const renderRadioButton = ({
  city,
  zipCode,
  setSelectedZipCode,
  selectedZipCode,
}: RenderButtonParams) => {
  const checked = selectedZipCode === zipCode;
  return (
    <Stack key={city} direction={'row'} alignItems={'center'}>
      <FormControlLabel
        value={zipCode}
        control={
          <Radio
            onClick={() => {
              setSelectedZipCode(zipCode);
            }}
            checked={checked}
          />
        }
        label={city}
      />
    </Stack>
  );
};

export const LocationSelector = ({
  selectedZipCode,
  setSelectedZipCode,
}: {
  selectedZipCode: number;
  setSelectedZipCode: (zipCode: number) => void;
}) => {
  return (
    <Stack direction={'row'}>
      <Label variant="h4" sx={{ mr: '1.5rem' }}>
        <span>Choose location</span>
      </Label>
      {Object.entries(Locations).map(([city, zipCode]) =>
        renderRadioButton({
          city,
          zipCode,
          setSelectedZipCode,
          selectedZipCode,
        }),
      )}
    </Stack>
  );
};
