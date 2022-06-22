import React, { useState } from 'react';
import {Stack, Button, Typography, Box, InputLabel, MenuItem, FormControl, TextField, Tabs, Tab} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import '../../assets/css/Stepper.css';
import {selected, unselected, line} from './StepperStyle'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Address} from "../../models/AddressModel";
import AddressService from "../../redux/services/AddressService";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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

export interface FirstOrderInfo
{
  address : Address,
  dateTime : string,
  dateTimeEnd : string,
  comment : string,
  periodicity : number
}

export default function StepOne() {

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

  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = React.useState<number>();
  const [address, setAddress] = React.useState<Address>();
  const [dateTime, setDateTime] = React.useState<string>();
  const [dateTimeEnd, setDateTimeEnd] = React.useState<string>();
  const [periodicity, setPeriodicity] = React.useState<number>();
  const [comment, setComment] = React.useState<string>();
  
    // const handleChangeAddress = (event: SelectChangeEvent) => {
    //   setSelectedAddress(event.target.value as number);
    // };

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
    const [addressId, setAddressId] = useState<number>(0);

    React.useEffect(() => {
      if (key) return;
        AddressService.GetAddresses().then((res : any) => {
          setAddresses(res.addresses);
        })
        setKey(true);
    }, [addresses])

    const nextPage = () => {
      if(address === undefined || dateTime === undefined)
      {
        handleClickSnack();
        return;
      }
      navigate("/to-order-two", {state:
        {
          address: address, 
          dateTime: dateTime, 
          dateTimeEnd: dateTimeEnd,
          comment: comment,
          periodicity : periodicity
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
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '56%', marginLeft: '22%', marginTop: '10px' }}>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}}
          onClick={nextPage}
          >
            Далее
          </Button>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
            message="Выберите адрес и время"
            action={action}
          />
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
                  onChange={e => {
                      setSelectedAddress(+e.target.value);
                      addresses.forEach((a) => {
                        if (a.ID === e.target.value)
                        {
                          setAddress(a);
                          return;
                        }
                      })
                    }}
                >
                  {addresses.map((address) => (
                    
                    <MenuItem value={address.ID}>{address.AddressName}</MenuItem>
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
                defaultValue={dateTime}
                onChange={e => {
                  setDateTime(e.target.value);

              }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="date"
                label="Конец периода"
                type="date"
                defaultValue={dateTimeEnd}
                onChange={e => {
                  setDateTimeEnd(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Периодичность</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={periodicity}
                    label="Age"
                    onChange={e => {
                      setPeriodicity(+e.target.value);
                  }}
                  >
                    <MenuItem value={1}>Каждый день</MenuItem>
                    <MenuItem value={2}>Через 1 дня</MenuItem>
                    <MenuItem value={3}>Через 2 дня</MenuItem>
                    <MenuItem value={4}>Через 3 дня</MenuItem>
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
                  value={selectedAddress}
                  label="Age"
                  onChange={e => {
                      setSelectedAddress(+e.target.value);
                      addresses.forEach((a) => {
                        if (a.ID === e.target.value)
                        {
                          setAddress(a);
                          return;
                        }
                      })
                    }}
                >
                  {addresses.map((address) => (
                    
                    <MenuItem value={address.ID}>{address.AddressName}</MenuItem>
                  ))}
                </Select>
              </FormControl>

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
      </Box>
    </Stack>
    
  );
}