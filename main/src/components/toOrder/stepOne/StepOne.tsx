import React from 'react';
import {Box, Stack, InputLabel, MenuItem, FormControl, TextField, Typography, Button, Card, CardHeader, CardContent, CardActions, Fab, Dialog, DialogActions, DialogContent, DialogContentText, Tabs, Tab} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import { YMaps, Map } from 'react-yandex-maps';
import {Address} from "../../../models/AddressModel";
import AddressService from "../../../redux/services/AddressService";
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

// const [addresses, setAddresses] = React.useState<Address[]>([]);

// React.useEffect(() => {
//   if (addresses.length !== 0) return;
//   AddressService.GetAddress().then((res) => {
//     setAddresses(res);
//   })
//   console.log(addresses);
// }, [addresses])

export default function Stepper() {

    const [name, setName] = React.useState('');
  
    const handleChange = (event: SelectChangeEvent) => {
      setName(event.target.value as string);
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

  return (

    <Box sx={{ width: '100%', height: '100%',backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px'}}>
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
            <Stack direction='row' justifyContent='space-between'>
              <FormControl fullWidth sx={{width:'78%'}}>
                <InputLabel id="demo-simple-select-label">Адрес</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  label="Age"
                  onChange={handleChange}
                >
                  {/* {addresses.map((address) => (
                    <MenuItem value={address.ID}>{address.FullAddress}</MenuItem>
                  ))} */}
                </Select>
              </FormControl>
              <Stack
                component="form"
                sx={{width: '20%'}}
                noValidate
                autoComplete="off"
                alignItems="center"
              >
                <Fab color="secondary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Stack>
            </Stack>

            <TextField
              id="datetime-local"
              label="Дата и время"
              type="datetime-local"
              defaultValue="2022-05-01T08:00:00"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="outlined-multiline-static"
              label="Комментарий"
              multiline
              rows={6}
            />

          </Stack>
          <Stack width='30%'>
            <Card sx={{ width: '100%', backgroundColor: '#B1A18B', borderRadius:"10px", marginTop: '5px'}}>
              <CardHeader
                action={
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                }
                title="Работа"
              />
              <CardContent sx={{ mt: '-5%'}}>
                <YMaps>
                  <div>
                    <Map defaultState={{ center: [58.60, 49.66], zoom: 11 }} style={{height: "240px"}} />
                  </div>
                </YMaps>
              </CardContent>
              <CardActions disableSpacing>
                  <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px', width: '100%'}} endIcon={<EditOutlinedIcon />}>
                    <Typography>Адрес 1</Typography>
                  </Button>
              </CardActions>
            </Card>
          </Stack>
        </Stack>
          
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Удалить адрес?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Нет</Button>
            <Button onClick={handleClose} autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
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
                  value={name}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Каждый день</MenuItem>
                  <MenuItem value={2}>Через день</MenuItem>
                  <MenuItem value={3}>Через 2 дня</MenuItem>
                  <MenuItem value={4}>Через 3 дня</MenuItem>
                  <MenuItem value={5}>Через 4 дня</MenuItem>
                  <MenuItem value={6}>Через 5 дня</MenuItem>
                  <MenuItem value={7}>Через 6 дня</MenuItem>
                </Select>
              </FormControl>
          </Stack>
          <Stack width='30%' spacing={2}>
            <Typography variant="h5" color="primary" align='center'>Выбор адреса</Typography>
            <Stack direction='row' justifyContent='space-between'>
              <FormControl fullWidth sx={{width:'78%'}}>
                <InputLabel id="demo-simple-select-label">Адрес</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Воровского 101, кв. 6.</MenuItem>
                  <MenuItem value={2}>пр. Строителей 98, кв. 105.</MenuItem>
                </Select>
              </FormControl>
              <Stack
                component="form"
                sx={{width: '20%'}}
                noValidate
                autoComplete="off"
                alignItems="center"
              >
                <Fab color="secondary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Stack>
            </Stack>

            <TextField
              id="outlined-multiline-static"
              label="Комментарий"
              multiline
              rows={6}
            />

          </Stack>
          <Stack width='30%'>
            <Card sx={{ width: '100%', backgroundColor: '#B1A18B', borderRadius:"10px", marginTop: '5px'}}>
              <CardHeader
                action={
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                }
                title="Работа"
              />
              <CardContent sx={{ mt: '-5%'}}>
                <YMaps>
                  <div>
                    <Map defaultState={{ center: [58.60, 49.66], zoom: 11 }} style={{height: "240px"}} />
                  </div>
                </YMaps>
              </CardContent>
              <CardActions disableSpacing>
                  <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px', width: '100%'}} endIcon={<EditOutlinedIcon />}>
                    <Typography>Адрес 1</Typography>
                  </Button>
              </CardActions>
            </Card>
          </Stack>
        </Stack>
          
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Удалить адрес?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Нет</Button>
            <Button onClick={handleClose} autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </TabPanel>
    </Box>
  );
}