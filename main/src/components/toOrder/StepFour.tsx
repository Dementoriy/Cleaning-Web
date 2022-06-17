import React from 'react';
import {Stack, Button, Typography, Box, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {selected, line} from './StepperStyle';

export default function Steppers() {

  const navigate = useNavigate();

  return (
    <Stack spacing={3} width='78%'>
      <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', marginTop: '17px', width: '100%', marginRight: '17px'}}>
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

          <div style={selected}>
            <h6>4</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>Оплата</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '56%', marginLeft: '22%', marginTop: '10px' }}>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-three")}}>
            Назад
          </Button>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/my-cleaning")}}>
            Оплатить
          </Button>
        </Stack>
      </div>
      <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px',  width: '100%', marginRight: '17px', height: '38%'}}>
        <Box>
          <Typography variant="h5" color="primary" align='center'>Информация о заявке</Typography>
          <Stack direction="row" spacing={6} padding={4}>
            <Stack spacing={1} width={"50%"}>
              <Box sx={{borderBottom: '3px solid #776D61'}}>
                  <Typography variant="h5" color="primary">
                      Место уборки
                  </Typography>
              </Box>
              <TextField label="Адрес" color='primary' size='small'/>
              <TextField label="Тип помещения" color='primary' size='small'/>

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Время уборки
                </Typography>
              </Box>
              <TextField label="Уборка запланирована на" color='primary' size='small'/>
              <TextField label="Уборка займет" color='primary' size='small'/>
              <TextField label="Статус заявки" color='primary' size='small' value={"Сформирована"}/>
            </Stack>
            <Stack spacing={1} width={"50%"}>
              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Услуга
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <TextField label="Тип уборки" color='primary' size='small'/>
                <Stack direction="row" spacing={2}>
                  <TextField label="Площадь" color='primary' size='small'/>
                  <TextField label="Цена" color='primary' size='small'/>
                </Stack>
              </Stack>

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Дополнительные услуги
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <TextField label="Доп. услуга" color='primary' size='small'/>
                <Stack direction="row" spacing={2}>
                  <TextField label="Количество" color='primary' size='small'/>
                  <TextField label="Цена" color='primary' size='small'/>
                </Stack>
              </Stack>

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Итог
                </Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <div></div>
                <TextField label="Итоговая цена" color='primary' size='small' sx={{ width: '30%'}}/>
              </Stack>
              <TextField
                id="outlined-multiline-static"
                label="Комментарий"
                multiline
                rows={6}
              />
            </Stack>
          </Stack>
        </Box>
      </div>
    </Stack>
    
  );
}