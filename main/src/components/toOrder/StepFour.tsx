import React from 'react';
import {Stack, Button, Typography, Box, TextField} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import {selected, line} from './StepperStyle';
import {FinalOrderInfo} from './StepThree';
import {Service} from '../../models/ServiceModel';
import OrderService from '../../redux/services/OrderService';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
 
export default function StepFour() {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const finalOrderInfo: FinalOrderInfo = location.state as FinalOrderInfo;

  const info = () => {
    console.log(finalOrderInfo);
  }

  const Pay = () => {
    OrderService.addOrder(finalOrderInfo).then((res: any) => {
      dispatch(res);
  });
    // navigate("/my-cleaning");
  }

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
        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ width: '56%', marginLeft: '22%', marginTop: '10px' }}>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-one")}}>
            Отмена
          </Button>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={Pay}>
            Оплатить
          </Button>
        </Stack>
      </div>
      <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px',  width: '100%', marginRight: '17px', height: '38%'}}>
        <Box>
          <Typography variant="h5" color="primary" align='center'>Информация о заявке</Typography>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={info}>
            инфа
          </Button>
          <Stack direction="row" spacing={6} padding={4}>
            <Stack spacing={1} width={"50%"}>
              <Box sx={{borderBottom: '3px solid #776D61'}}>
                  <Typography variant="h5" color="primary">
                      Место уборки
                  </Typography>
              </Box>
              <TextField label="Адрес" color='primary' size='small' value={finalOrderInfo.address.FullAddress}/>
              <TextField label="Тип помещения" color='primary' size='small' value={finalOrderInfo.address.RoomType}/>

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Время уборки
                </Typography>
              </Box>
              <TextField label="Уборка запланирована на" color='primary' size='small' value={finalOrderInfo.dateTime}/>
              <TextField label="Уборка займет" color='primary' size='small' value={finalOrderInfo.time}/>
              <TextField label="Статус заявки" color='primary' size='small' value={"Сформирована"}/>
            </Stack>
            <Stack spacing={1} width={"50%"}>
              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Услуга
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <TextField label="Тип уборки" color='primary' size='small' value={finalOrderInfo.service.ServiceName}/>
                <Stack direction="row" spacing={2}>
                  <TextField label="Площадь" color='primary' size='small' value={finalOrderInfo.square}/>
                  <TextField label="Цена" color='primary' size='small' value={finalOrderInfo.square * finalOrderInfo.service.Price * finalOrderInfo.address.Сoefficient}/>
                </Stack>
              </Stack>

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Дополнительные услуги
                </Typography>
              </Box>

                {finalOrderInfo.dopService.map((ps, index) => (
                  <Stack direction="row" spacing={2}>
                    <TextField label="Доп. услуга" color='primary' size='small' value={ps.ServiceName}/>
                    <Stack direction="row" spacing={2}>
                      <TextField label="Количество" color='primary' size='small' value={finalOrderInfo.amount[index]}/>
                      <TextField label="Цена" color='primary' size='small' value={finalOrderInfo.amount[index] * ps.Price * finalOrderInfo.address.Сoefficient}/>
                    </Stack>
                  </Stack>
                ))}
                

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  Итог
                </Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <div></div>
                <TextField label="Итоговая цена" color='primary' size='small' sx={{ width: '30%'}} value={finalOrderInfo.price}/>
              </Stack>
              <TextField
                id="outlined-multiline-static"
                label="Комментарий"
                multiline
                rows={6}
                value={finalOrderInfo.comment}
              />
            </Stack>
          </Stack>
        </Box>
      </div>
    </Stack>
    
  );
}