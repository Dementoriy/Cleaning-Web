import React, { useState } from 'react';
import {Stack, Button, Typography, Box, InputLabel, MenuItem, FormControl, TextField, Tabs, Tab} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import '../../assets/css/Stepper.css';
import {selected, unselected, line} from './StepperStyle'

import Select, { SelectChangeEvent } from '@mui/material/Select';

import {Address} from "../../models/AddressModel";
import AddressService from "../../redux/services/AddressService";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface FirsOrderInfo
{
  address : Address,
  dateTime : string,
  comment : string
}

export default function Steppers() {

  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = React.useState<string>();
  const [address, setAddress] = React.useState<Address>();
  const [dateTime, setDateTime] = React.useState<string>();
  const [comment, setComment] = React.useState<string>();
  
    const handleChangeAddress = (event: SelectChangeEvent) => {
      setAddress(address);
      setSelectedAddress(event.target.value as string);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [value, setValue] = React.useState(0);

    const handleChangeStep = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const [addresses, setAddresses] = React.useState<Address[]>([]);
    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
      if (key) return;
        AddressService.GetAddresses().then((res : any) => {
          setAddresses(res.addresses);
        })
        setKey(true);
    }, [addresses])

    const nextPage = () => {
      navigate("/to-order-two", {state:
        {
          address: address, 
          dateTime: dateTime, 
          comment: comment
        }
      });
    };

  return (
    <Stack spacing={3} width='78%'>
      <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', marginTop: '17px', width: '100%'}}>
        <Typography variant="h5" color="primary" align='center'>Оформление заявки</Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ width: '90%', marginLeft: '5%', marginTop: '8px' }}>
          <div style={selected}>
            <h6>1</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>Адрес и дата</Typography>
          <div style={line}></div>

          <div style={unselected}> 
            <h6>2</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>Выбор услуги</Typography>
          <div style={line}></div>

          <div style={unselected}>
            <h6>3</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>Доп. услуги</Typography>
          <div style={line}></div>

          <div style={unselected}>
            <h6>4</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>Оплата</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '56%', marginLeft: '22%', marginTop: '10px' }}>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} disabled>
            Назад
          </Button>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}}
          onClick={nextPage}
          //onClick={() => {navigate("/to-order-two",
          // {state:
          //   {
          //     address: address, 
          //     dateTime: dateTime, 
          //     comment: comment
          //   }
          // }
          >
            Далее
          </Button>
        </Stack>
      </div>
      <Box sx={{ width: '100%', height: '38%',backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeStep} aria-label="basic tabs example" centered>
            <Tab label="Разовая уборка" {...a11yProps(0)} />
            <Tab label="Периодическая уборка" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Stack direction='row' width='100%' spacing={6} justifyContent="center">
            <Stack width='30%' spacing={2}>
              <Typography variant="h5" color="primary" align='center'>Выбор адреса</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Адрес</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAddress}
                  label="Age"
                  onChange={handleChangeAddress}
                >
                  {addresses.map((address) => (
                    
                    <MenuItem value={address.FullAddress}>{address.FullAddress}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="datetime-local"
                label="Дата и время"
                type="datetime-local"
                defaultValue={dateTime}
                onChange={e => {
                  setDateTime(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-multiline-static"
                label="Комментарий"
                defaultValue={comment}
                multiline
                rows={6}
                onChange={e => {
                  setComment(e.target.value);

              }}
              />

            </Stack>
          </Stack>
        </TabPanel>
                  
        <TabPanel value={value} index={1}>
          <Stack direction='row' width='100%' spacing={6} justifyContent="center">
            <Stack width='30%' spacing={2}>
              <Typography variant="h5" color="primary" align='center'>Выбор периода</Typography>
              <TextField
                id="datetime-local"
                label="Начало периода"
                type="datetime-local"
                defaultValue="2022-05-01T08:00:00"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="datetime-local"
                label="Конец периода"
                type="datetime-local"
                defaultValue="2022-05-01T08:00:00"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Периодичность</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={name}
                    label="Age"
                    // onChange={handleChange}
                  >
                    {addresses.map((address) => (
                      <MenuItem value={address.FullAddress}>{address.FullAddress}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </Stack>
            <Stack width='30%' spacing={2}>
              <Typography variant="h5" color="primary" align='center'>Выбор адреса</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Адрес</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={name}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Воровского 101, кв. 6.</MenuItem>
                  <MenuItem value={2}>пр. Строителей 98, кв. 105.</MenuItem>
                </Select>
              </FormControl> 

              <TextField
                id="outlined-multiline-static"
                label="Комментарий"
                multiline
                rows={6}
              />

            </Stack>
          </Stack>
        </TabPanel>
      </Box>
    </Stack>
    
  );
}