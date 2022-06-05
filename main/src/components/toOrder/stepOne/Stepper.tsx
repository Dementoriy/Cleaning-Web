import React from 'react';
import {Stack, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import '../../../assets/css/Stepper.css';
import {selected, unselected, line} from '../StepperStyle'

export default function Steppers() {

  const navigate = useNavigate();

  return (
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
        <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-two")}}>
          Далее
        </Button>
      </Stack>
    </div>
  );
}