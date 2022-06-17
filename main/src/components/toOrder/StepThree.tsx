import React, { useState } from 'react';
import {Box, Checkbox, FormGroup, FormControlLabel, Card, CardContent, CardMedia, TextField, Typography, Stack, Button, InputLabel, MenuItem, FormControl} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import {selected, unselected, line} from './StepperStyle';
import ServiceService from '../../redux/services/ServiceService';
import {Service} from "../../models/ServiceModel";
import "../../assets/css/Scrollbar.css"
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Steppers() {

  const navigate = useNavigate();

  const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const square = searchParams.get("square");
    const type = searchParams.get("type");
    const price = searchParams.get("price");
    const time = searchParams.get("time");

  const [name, setName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

  const [services, setServices] = React.useState<Service[]>([]);

    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
      if (key) return;
        if (services.length !== 0) return;
        ServiceService.GetService().then((res) => {
            setServices(res);
        })
        setKey(true);
    }, [services])

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
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '56%', marginLeft: '22%', marginTop: '10px' }}>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-two")}}>
            Назад
          </Button>
          <Stack direction="row" spacing={2}>
            <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-four")}}>
              Пропустить
            </Button>
            <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-four")}}>
              Далее
            </Button>
          </Stack>
        </Stack>
      </div>
      <Stack direction="row" justifyContent="space-between">
        <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: "74%", height: "46%" }}>
          <Typography variant="h5" color="primary" align='center'>Дополнительные услуги</Typography>
          <Stack direction="row" alignItems="center" justifyContent={"center"} mt={1} mb={1}>
            <TextField label="Поиск" color='primary' size='small' sx={{width: '40%'}}></TextField>
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
                      <TextField label="Количество" color='primary' size='small' sx={{mt: '10%', width: '98%'}} />
                    </FormGroup>
                  </Box>
                </Box>
              </Card>
            </div>}</>))}
          </Stack>
        </div>
        <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: "20%", marginLeft: "26px", paddingBottom: '40px', height: "30%"}}>
          <Typography variant="h5" color="primary" align='center'>Калькулятор</Typography>
          <Stack spacing={2.5} mt={2} alignItems="center">
            <TextField type='text' label="Площадь:" color='primary' size='small' sx={{width: '80%'}} value={square} />
            <TextField type='text' label="Тип:" color='primary' size='small' sx={{width: '80%'}} />
            <TextField label="Цена" color='primary' size='small' sx={{width: '80%'}} value={price}/>
            <TextField label="≈Время" color='primary' size='small' sx={{width: '80%'}} value={time}/>
          </Stack>
        </div>
      </Stack>
    </Stack>
    
  );
}