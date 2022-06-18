import React, { useState } from 'react';
import { Typography, MenuItem, InputLabel,  FormControl, OutlinedInput, Box, Chip, Checkbox, Stack, TextField, Button} from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Address} from "../../models/AddressModel";
import {Consumable} from "../../models/ConsumableModel";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {filtersState} from "../../redux/reducers/filterReducer";
import FiltersService from '../../redux/services/FiltersService';

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

    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();

    const theme = useTheme();
    const [filterAddress, setFilterAddress] = React.useState<string[]>([]);
    const [filterConsumable, setFilterСonsumable] = React.useState<string[]>([]);

    const [receivedAddresses, setReceivedAddresses] = React.useState<Address[]>([]);
    const [receivedConsumables, setReceivedConsumables] = React.useState<Consumable[]>([]);

    const [dateTimeOt, setDateTimeOt] = React.useState<string>();
    const [dateTimeDo, setDateTimeDo] = React.useState<string>();

    const [address, setAddress] = React.useState<Address>();
  
    const handleChangeAddress = (event: SelectChangeEvent<typeof filterAddress>) => {
      const {
        target: { value },
      } = event;
      setFilterAddress(
        typeof value === 'string' ? value.split(',') : value,
      );
      setReceivedAddresses(receivedAddresses);
    };
    const handleChangeConsumable = (event: SelectChangeEvent<typeof filterConsumable>) => {
        const {
          target: { value },
        } = event;
        setFilterСonsumable(
          typeof value === 'string' ? value.split(',') : value,
        );
        setReceivedConsumables(receivedConsumables);
      };

    // const [consumables, setConsumables] = React.useState<Consumable[]>([]);

    const filterOrder = () => {
      const filters : filtersState = {
        address: receivedAddresses,
        consumables : receivedConsumables,
        dateOt: dateTimeOt!,
        dateDo: dateTimeDo!
      };
      console.log(filters);
      FiltersService.GetOrder(filters).then((res: any) => {
        dispatch(res);
      });
    }

    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
      if (key) return;
      FiltersService.GetFilters().then((res : any) => {
        dispatch(res);
      })
      setKey(true);
    }, [])

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
            value={filterAddress}
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
            {state.filterReducer.address.map((receivedAddresses) => (
                <MenuItem
                key={receivedAddresses.FullAddress}
                value={receivedAddresses.FullAddress}
                style={getStyles(receivedAddresses.FullAddress, filterAddress, theme)}
                >
                <Checkbox checked={filterAddress.indexOf(receivedAddresses.FullAddress) > -1} />
                {receivedAddresses.FullAddress}
                </MenuItem>
            ))}
            </Select>
          </FormControl>
            
          <TextField
            id="date"
            label="От"
            type="date"
            defaultValue={dateTimeOt}
                onChange={e => {
                  setDateTimeOt(e.target.value);
                }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="date"
            label="До"
            type="date"
            defaultValue={dateTimeDo}
                onChange={e => {
                  setDateTimeDo(e.target.value);
                }}
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
              value={filterConsumable}
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
              {state.filterReducer.consumables.map((receivedConsumables) => (
                <MenuItem
                key={receivedConsumables.Id}
                value={receivedConsumables.Name}
                style={getStyles(receivedConsumables.Name, filterConsumable, theme)}
                >
                <Checkbox checked={filterConsumable.indexOf(receivedConsumables.Name) > -1} />
                {receivedConsumables.Name}
                </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Stack>
        <Box mt={2} sx={{ textAlign: 'center'}}>
          <Button variant="contained" color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={filterOrder}>
            Применить
          </Button>
        </Box>
    </div>
  );
}