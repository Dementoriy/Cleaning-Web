import React, { useState } from 'react';
import { Typography, MenuItem, InputLabel,  FormControl, OutlinedInput, Box, Chip, Checkbox, Stack, TextField, Button} from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Address} from "../../models/AddressModel";
import {Consumable} from "../../models/ConsumableModel";
import FiltersService from "../../redux/services/FiltersService";
import ConsumableService from "../../redux/services/ConsumableService";

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

    const [addresses, setAddresses] = React.useState<Address[]>([]);
    const [consumables, setConsumables] = React.useState<Consumable[]>([]);

    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
      if (key) return;
      if (addresses.length !== 0) return;
      if (consumables.length !== 0) return;
      FiltersService.GetFilters().then((res : any) => {
        setAddresses(res.addresses);
        setConsumables(res.consumables);
      })
      setKey(true);
    }, [addresses, consumables])

  return (
    <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', paddingBottom: '40px', width: '100%', height: '100%'}}>
        <Typography variant="h5" color="primary" align='center'>Фильтры</Typography>
        <Stack spacing={2} mt={2} sx={{width: '100%'}}>
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
            {addresses.map((addressItem) => (
                <MenuItem
                key={addressItem.FullAddress}
                value={addressItem.FullAddress}
                style={getStyles(addressItem.FullAddress, address, theme)}
                >
                <Checkbox checked={address.indexOf(addressItem.FullAddress) > -1} />
                {addressItem.FullAddress}
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
            label="До"
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
              {consumables.map((consumableItem) => (
                <MenuItem
                key={consumableItem.Id}
                value={consumableItem.Name}
                style={getStyles(consumableItem.Name, consumable, theme)}
                >
                <Checkbox checked={consumable.indexOf(consumableItem.Name) > -1} />
                {consumableItem.Name}
                </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Stack>
        <Box mt={2} sx={{ textAlign: 'center'}}>
          <Button variant="contained" color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}}>
            Применить
          </Button>
        </Box>
    </div>
  );
}