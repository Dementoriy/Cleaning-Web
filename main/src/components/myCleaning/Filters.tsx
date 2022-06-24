import React, { useState } from 'react';
import { Typography, MenuItem, InputLabel,  FormControl, OutlinedInput, Box, Chip, Checkbox, Stack, TextField, Button} from "@mui/material";
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Address} from "../../models/AddressModel";
import {Filter} from "../../models/FilterModel";
import {Consumable} from "../../models/ConsumableModel";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import FiltersService from '../../redux/services/FiltersService';
import OrderService from '../../redux/services/OrderService';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function Filters() {

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();

    const theme = useTheme();

    const [selectedAddress, setSelectedAddress] = React.useState<number>();
    const [address, setAddress] = React.useState<Address>();

    const [selectedConsumable, setSelectedConsumable] = React.useState<number>();
    const [consumable, setConsumable] = React.useState<Consumable>();

    const [dateTimeOt, setDateTimeOt] = React.useState<string>();
    const [dateTimeDo, setDateTimeDo] = React.useState<string>();

    const filterOrder = () => {
      if(selectedAddress === undefined || dateTimeOt === undefined || dateTimeDo === undefined)
      {
        handleClickSnack();
        return;
      }
      const filters : Filter = {
        address: selectedAddress!,
        consumables : selectedConsumable!,
        dateOt: dateTimeOt!,
        dateDo: dateTimeDo!
      };
      console.log(JSON.stringify(filters));
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
    }, [key, dispatch])

    const addReport = () => {
      if(selectedAddress === undefined || dateTimeOt === undefined || dateTimeDo === undefined)
      {
        handleClickSnack();
        return;
      }
      const filters : Filter = {
        address: selectedAddress!,
        consumables : selectedConsumable!,
        dateOt: dateTimeOt!,
        dateDo: dateTimeDo!
      };
      console.log(JSON.stringify(filters));
      OrderService.addReport(filters);
    };

  return (
    <Stack spacing={4} width='100%'>
      <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', paddingBottom: '40px', width: '100%', height: '33%'}}>
        <Typography variant="h5" color="primary" align='center'>Фильтры</Typography>
        <Stack spacing={2} mt={2} sx={{width: '100%'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Адрес</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAddress}
            label="Age"
            onChange={e => {
                setSelectedAddress(+e.target.value);
                state.filterReducer.address.forEach((a) => {
                  if (a.ID === e.target.value)
                  {
                    setAddress(a);
                    return;
                  }
                })
              }}
          >
            {state.filterReducer.address.map((address) => (
              
              <MenuItem value={address.ID}>{address.AddressName}</MenuItem>
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

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Расходник</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedConsumable}
            label="Age"
            onChange={e => {
                setSelectedConsumable(+e.target.value);
                state.filterReducer.consumables.forEach((a) => {
                  if (a.ID === +e.target.value)
                  {
                    setConsumable(a);
                    return;
                  }
                })
              }}
          >
            {state.filterReducer.consumables.map((consumable) => (
              
              <MenuItem value={consumable.ID}>{consumable.Name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box mt={2} sx={{ textAlign: 'center'}}>
        <Button variant="contained" color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={filterOrder}>
          Применить
        </Button>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          message="Необходимо выбрать адрес, дату начала и дату конца периода"
          action={action}
        />
      </Box>
    </div>
    <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', paddingBottom: '30px',  width: '100%', height: '50%'}}>
        <Typography variant="h5" color="primary" align='center'>Экспорт</Typography>
        <Stack alignItems="center" spacing={3} mt={2}>
          <Typography variant="subtitle1" color="primary">
            Отчет по отфильтрованным заявкам в формате Excel. 
          </Typography>
          <Button variant="contained" color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={addReport}>
          Сформировать отчет
          </Button>
        </Stack>
    </div>
  </Stack>
    
  );
}