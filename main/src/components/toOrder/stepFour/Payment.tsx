import React from 'react';
import {Stack, Box, Typography, TextField} from '@mui/material';

export default function Payment() {


  return (
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
                  <TextField label="Статус заявки" color='primary' size='small'/>
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
  );
}