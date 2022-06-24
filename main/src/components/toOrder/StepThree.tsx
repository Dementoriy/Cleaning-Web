import React, { useState } from 'react';
import {Box, Checkbox, FormGroup, FormControlLabel, Card, CardContent, CardMedia, TextField, Typography, Stack, Button, InputLabel, MenuItem, FormControl} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import {selected, unselected, line} from './StepperStyle';
import ServiceService from '../../redux/services/ServiceService';
import {Service} from "../../models/ServiceModel";
import "../../assets/css/Scrollbar.css"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {OrderInfo} from './StepTwo';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Address} from "../../models/AddressModel";

export interface FinalOrderInfo
{
  address : Address,
  dateTime : string,
  dateTimeEnd : string,
  comment : string
  periodicity : number,
  service: Service,
  square: number,
  price: number,
  time: string,
  timeValue: number,
  dopService: Service[],
  amount: number[],
  count: number
}

export default function StepThree() {

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

  const changeAmount=(e:any)=>{
    setAmount(e.target.value);
    }

  const [name, setName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

  const [services, setServices] = React.useState<Service[]>([]);

    const [key, setKey] = useState<boolean>(false);

    const location = useLocation();
    const orderInfo: OrderInfo = location.state as OrderInfo;

    React.useEffect(() => {
      if (key) return;
        setPrice(orderInfo.price);
        setTime(orderInfo.time);
        setTimeValue(orderInfo.timeValue)
        ServiceService.GetService().then((res) => {
            setServices(res);
        })
        setKey(true);
    }, [services]);

  const [price, setPrice] = React.useState<number>();
  const [time, setTime] = React.useState<string>();
  const [amount, setAmount] = React.useState<number>();
  const [selectedService, setSelectedService] = React.useState<Service>();
  const [amountMass, setAmountMass] = React.useState<number[]>([]);
  const [selectedServiceMass, setSelectedServiceMass] = React.useState<Service[]>([]);
  const [timeValue, setTimeValue] = React.useState<number>();

  const addPsMass = (amount: number, selectedService: Service)=>{
    if (selectedServiceMass.includes(selectedService)){
      setPrice(price! - selectedService.Price * amount! * orderInfo.address.Сoefficient);
      var index = selectedServiceMass.indexOf(selectedService);
      setSelectedServiceMass((selectedServiceMass)=>[...selectedServiceMass.filter(i=>i !== selectedService)]);
      amountMass.splice(index, 1);
    }
    else {
      setSelectedServiceMass(selectedServiceMass=>[...selectedServiceMass,selectedService]);
      setAmountMass(amountMass=>[...amountMass,amount]);
    }
    
  }

  const [serviceMass, setServiceMass] = React.useState<boolean[]>([]);

  const calculate = (service: Service) => {
    services.forEach((a) => {
      if (a.ID === service.ID && serviceMass[a.ID] == false)
      {
        service.BtnStatus == false;
        return;
      }
    })
    if(amount === NaN || amount === undefined) 
    {
      handleClick();
      return;
    }
    setAmount(amount);
    setSelectedService(service);
    addPsMass(amount, service);
    setPrice(price! + service.Price * amount! * orderInfo.address.Сoefficient);
    setTimeValue(timeValue! + service.Time * amount!);
    ServiceService.GetTime(orderInfo.timeValue + service.Time * amount!).then((res: any) => {
      setTime(res);
    })
    console.log(service);
  };

  const NextPage = () => {
    navigate("/to-order-four",
    {state:
      {
        address: orderInfo.address, 
        dateTime: orderInfo.dateTime,
        dateTimeEnd: orderInfo.dateTimeEnd,
        comment: orderInfo.comment,
        periodicity: orderInfo.periodicity,
        service: orderInfo.service,
        square: orderInfo.square,
        price: price,
        time: time,
        timeValue: timeValue,
        dopService: selectedServiceMass,
        amount: amountMass
      }
    });
  }

  const [search, setSearch] = React.useState<string>();
    const getDopSearch = (search : string) =>{
      ServiceService.getDopSearch(search).then((res) => {
        setServices(res);
    })}

  return (
    <Stack spacing={3} width='78%'>
      <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: '100%', marginTop: '17px'}}>
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

          <div style={selected}>
            <h6>3</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>Доп. услуги</Typography>
          <div style={line}></div>

          <div style={unselected}>
            <h6>4</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>Оплата</Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ width: '56%', marginLeft: '22%', marginTop: '10px' }}>
            <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-four")}}>
              Пропустить
            </Button>
            <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={NextPage}>
              Далее
            </Button>
        </Stack>
      </div>
      <Stack direction="row" justifyContent="space-between">
        <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: "74%", height: "460px" }}>
          <Typography variant="h5" color="primary" align='center'>Дополнительные услуги</Typography>
          <Stack direction="row" alignItems="center" justifyContent={"center"} mt={1} mb={1}>
            <TextField label="Поиск" color='primary' size='small' sx={{width: '40%'}} onChange={e => {setSearch(e.target.value); getDopSearch(e.target.value)}}></TextField>
          </Stack>
          
          <Stack spacing={2}>
            {services.map((service)=>(<>
            {!service.IsMain &&
            <div key={service.ID}>
              <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80,  pl: "10px", pt: "2%" }}
                  image={service.Image}
                  alt="Service"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" color="primary">
                    {service.ServiceName}
                    </Typography>
                    <Typography variant="subtitle2">
                    {service.Description} 
                    </Typography>
                    <Typography variant="subtitle2">
                    От {service.Price} руб./{service.UnitsTitle}
                    </Typography>
                  </CardContent>
                </Box>
                <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '30%', padding: '8px'}}>
                  <Box marginTop={1}>
                    <FormGroup>
                      <TextField label="Количество" color='primary' size='small' sx={{mt: '10%', width: '98%'}} defaultValue={amount} onChange={changeAmount}/>
                    </FormGroup>
                  </Box>
                  <>{
                    (service.BtnStatus) ?
                    (<Button variant="contained" color="success" disableElevation sx={{ borderRadius: '10px', mt: '10%', width: '100%'}}  onClick={(e) => {calculate(service)}}>
                        Выбрать
                    </Button>) :
                    (<Button variant="contained" color="primary" disableElevation sx={{ borderRadius: '10px', mt: '10%', width: '100%'}}  onClick={(e) => {calculate(service)}}>
                        Отменить
                    </Button>)
                  }</>
                  
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Введите количество"
                    action={action}
                  />
                </Box>
              </Card>
            </div>}</>))}
          </Stack>
        </div>
        <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: "20%", marginLeft: "26px", paddingBottom: '40px', height: "300px"}}>
          <Typography variant="h5" color="primary" align='center'>Калькулятор</Typography>
          <Stack spacing={2.5} mt={2} alignItems="center">
            <TextField type='text' label="Площадь:" color='primary' size='small' sx={{width: '80%'}} value={orderInfo.square} />
            <TextField type='text' label="Тип:" color='primary' size='small' sx={{width: '80%'}} value={orderInfo.address.RoomType}/>
            <TextField label="Цена" color='primary' size='small' sx={{width: '80%'}} value={price} />
            <TextField label="≈Время" color='primary' size='small' sx={{width: '80%'}} value={time}/>
          </Stack>
        </div>
      </Stack>
    </Stack>
    
  );
}