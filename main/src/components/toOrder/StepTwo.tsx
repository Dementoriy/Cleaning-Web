import React, { useState } from 'react';
import { Button, Typography, CardMedia, CardContent, Card, Box, Stack, TextField, InputLabel, MenuItem, FormControl} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useNavigate,useLocation} from 'react-router-dom';
import {selected, unselected, line} from './StepperStyle';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import "../../assets/css/Scrollbar.css";
import ServiceService from '../../redux/services/ServiceService';
import {Service} from "../../models/ServiceModel";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {FirstOrderInfo} from './StepOne';
import {Address} from "../../models/AddressModel";

export interface State extends SnackbarOrigin {
  open: boolean;
}

export interface OrderInfo
{
  address : Address,
  dateTime : string,
  comment : string
  service: Service,
  square: number,
  price: number,
  time: string,
  timeValue: number
}

export default function StepTwo() {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const navigate = useNavigate();

  const [name, setName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

    const changeSquare=(e:any)=>{
        setSquare(e.target.value)
        }

    const [square, setSquare] = React.useState<number>();

  const [services, setServices] = React.useState<Service[]>([]);
    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
        if (key) return;
            ServiceService.GetService().then((res) => {
            setServices(res);
        })
        setKey(true);
    }, [services])

  const [selectedService, setSelectedService] = React.useState<Service>();
  const [price, setPrice] = React.useState<number>();
  const [time, setTime] = React.useState<string>();
  const [timeValue, setTimeValue] = React.useState<number>();

    const calculate = (service: Service) => {
      if(square === NaN || square === undefined) 
      {
        handleClick();
        return;
      }
      setSelectedService(service);
      setPrice(service.Price * square! * firstOrderInfo.address.Сoefficient);
      setTimeValue(service.Time * square!);
      ServiceService.GetTime(service.Time * square!).then((res: any) => {
        setTime(res);
      })
    };

    const location = useLocation();
    const firstOrderInfo: FirstOrderInfo = location.state as FirstOrderInfo;

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

          <div style={selected}>
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

          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-three",
          {state:
            {
              address: firstOrderInfo.address, 
              dateTime: firstOrderInfo.dateTime, 
              comment: firstOrderInfo.comment,
              service: selectedService,
              square: square,
              price: price,
              time: time,
              timeValue: timeValue
            }
          })}}>
            Далее
          </Button>
        </Stack>
      </div>
      <Stack direction="row" justifyContent="space-between">
        <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: "74%", height: "45%"}} >
          <Typography variant="h5" color="primary" align='center'>Услуги</Typography>
          <Stack direction="row" alignItems="center" justifyContent={"center"} mt={1} mb={1}>
              <TextField label="Поиск" color='primary' size='small' sx={{width: '40%'}}></TextField>
          </Stack>
          <Stack spacing={2}>
              {services.map((service)=>(<>
                  {service.IsMain &&
                  <div key={service.ID}>
                  <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", marginTop: "10px"}}>
                      <CardMedia
                          component="img"
                          sx={{ width: 120, height: 120,  pl: "20px", pt: "4%" }}
                          image={service.Image}
                          alt="Service"
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                          <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography color="primary" variant="h6">
                              {service.ServiceName}
                              </Typography>
                              <Typography variant="subtitle2">
                              {service.Description}
                              </Typography>
                          </CardContent>
                      </Box>
                      <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '20%', padding: '5px'}}>
                          <Stack direction={'row'} mt={5}>
                              <QueryBuilderOutlinedIcon fontSize="large"/>
                              <Typography variant="subtitle2" sx={{whiteSpace: 'nowrap'}}>Время уборки</Typography>
                          </Stack>
                          <Typography variant="subtitle2" color="text.primary" align="center" component="div" marginLeft="14%" mt="-10%">{service.ApproximateTime}</Typography>
                          <Typography variant="subtitle2" color="text.primary" align="center" component="div" sx={{ mt: '20%'}}>От {service.Price} руб./{service.UnitsTitle}</Typography>
                          <Button variant="contained" color="success" disableElevation sx={{ borderRadius: '10px', mt: '10%', width: '100%'}}  onClick={(e) => {calculate(service)}}>
                              Выбрать
                          </Button>
                          <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Введите площадь"
                            action={action}
                          />
                      </Box>
                  </Card>
                  </div>}</>))}
          </Stack>
        </div>
        <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: "20%", marginLeft: "26px", paddingBottom: '40px', height: "30%"}}>
          <Typography variant="h5" color="primary" align='center'>Калькулятор</Typography>
          <Stack spacing={2.5} mt={2} alignItems="center">
            <TextField type='text' label="Площадь:" color='primary' size='small' sx={{width: '80%'}} defaultValue={square} onChange={changeSquare}/>
            <TextField type='text' label="Тип:" color='primary' size='small' sx={{width: '80%'}} value={firstOrderInfo.address.RoomType}/>
            <TextField type='text' label="Цена" color='primary' size='small' sx={{width: '80%'}} value={price}/>
            <TextField type='text' label="≈Время" color='primary' size='small' sx={{width: '80%'}} value={time}/>
          </Stack>
        </div>
      </Stack>
    </Stack>
    
  );
}