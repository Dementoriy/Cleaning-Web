import * as React from 'react';
import { Typography, MenuItem, InputLabel,  FormControl, OutlinedInput, Box, Chip, Checkbox, Stack, TextField} from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

function Filters() {

    const theme = useTheme();
    const [address, setAddress] = React.useState<string[]>([]);
    const [consumable, setСonsumable] = React.useState<string[]>([]);
  
    const handleChangeAddress = (event: SelectChangeEvent<typeof address>) => {
      const {
        target: { value },
      } = event;
      setAddress(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const handleChangeConsumable = (event: SelectChangeEvent<typeof consumable>) => {
        const {
          target: { value },
        } = event;
        setСonsumable(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
  
      const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
      );
    
      const handleChange = (newValue: Date | null) => {
        setValue(newValue);
      };

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '20%'}}>
        <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Фильтры</Typography>
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
            
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                label="Date&Time picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider> */}

            <FormControl sx={{width: '100%'}}>
                <InputLabel id="consumable-chip-label">Расходуемые средства</InputLabel>
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

export default Filters;