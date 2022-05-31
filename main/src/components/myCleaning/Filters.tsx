import * as React from 'react';
import { Typography, MenuItem, InputLabel,  FormControl, OutlinedInput, Box, Chip, Checkbox, Stack, TextField} from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 40; //высота списка
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const addresses = [
  'Воровского 101, кв. 6.',
  'пр. Строителей 98, кв. 105.',
];

const consumables = [
    'Fairy',
    'Доместос',
  ];

function getStyles(name: string, string: readonly string[], theme: Theme) {
    return {
      fontWeight:
            string.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function Filters() {

    const theme = useTheme();
    const [address, setAddress] = React.useState<string[]>([]);
    const [consumable, setСonsumable] = React.useState<string[]>([]);
  
    const handleChangeAddress = (event: SelectChangeEvent<typeof address>) => {
      const {
        target: { value },
      } = event;
      setAddress(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const handleChangeConsumable = (event: SelectChangeEvent<typeof consumable>) => {
        const {
          target: { value },
        } = event;
        setСonsumable(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', marginTop: '17px', paddingBottom: '40px', width: '94%', marginRight: '17px'}}>
        <Typography variant="h5" color="primary" align='center' sx={{fontWeight: '500'}}>Фильтры</Typography>
        <Stack spacing={2} sx={{width: '100%', marginTop: '30px'}}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="address-chip-label">Адреса</InputLabel>
            <Select
            labelId="address-chip-label"
            id="address-chip"
            multiple
            value={address}
            onChange={handleChangeAddress}
            input={<OutlinedInput id="select-address-chip" label="address-chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            MenuProps={MenuProps}
            >
            {addresses.map((name) => (
                <MenuItem
                key={name}
                value={name}
                style={getStyles(name, address, theme)}
                >
                <Checkbox checked={address.indexOf(name) > -1} />
                {name}
                </MenuItem>
            ))}
            </Select>
          </FormControl>
            
          <TextField
            id="date"
            label="От"
            type="date"
            defaultValue="2022-05-01"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="date"
            label="От"
            type="date"
            defaultValue="2022-05-01"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl sx={{width: '100%'}}>
              <InputLabel id="consumable-chip-label">Средства уборки</InputLabel>
              <Select
              labelId="consumable-chip-label"
              id="consumable-chip"
              multiple
              value={consumable}
              onChange={handleChangeConsumable}
              input={<OutlinedInput id="select-consumable-chip" label="consumable-сhip" />}
              renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                      <Chip key={value} label={value} />
                  ))}
                  </Box>
              )}
              MenuProps={MenuProps}
              >
              {consumables.map((name) => (
                <MenuItem
                key={name}
                value={name}
                style={getStyles(name, consumable, theme)}
                >
                <Checkbox checked={consumable.indexOf(name) > -1} />
                {name}
                </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Stack>
    </div>
  );
}