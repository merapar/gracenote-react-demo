import { FormControlLabel, Radio } from '@mui/material';
import { Box } from './Box';
import { Label } from './Label';
import { FC } from 'react';

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
    <Box flexDirection={'row'} key={city} alignItems={'center'}>
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
    </Box>
  );
};

type Props = {
  selectedZipCode: number;
  setSelectedZipCode: (zipCode: number) => void;
};

export const LocationSelector: FC<Props> = ({
  selectedZipCode,
  setSelectedZipCode,
}) => {
  return (
    <Box flexDirection={'row'}>
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
    </Box>
  );
};
