import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material"; 

export default function Profile() {
  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '48%', minWidth: '700px'}}>
        <Stack direction="row" spacing={2}>
            <Avatar alt="Avatar" src="/image/ava.png" sx={{ width: 120, height: 120 }}/>
            <Stack spacing={1}>
              <Typography color="primary" variant="h4" sx={{fw: '500'}}>Вафлев Адам Неадамович</Typography>
              <Typography color="primary" variant="h5">@Adam</Typography>
            </Stack>
        </Stack>
        <Stack
          component="form"
          sx={{
            width: '60%',
            mt: '30px',
            fontFamily: 'Raleway',
            fw: '500'
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField label="Фамилия" size='small' />
          <TextField label="Имя" size='small' />
          <TextField label="Отчество" size='small'/>
          <TextField label="Номер телефона" size='small' />
          <TextField label="Email" size='small' />
        </Stack>
        <Button variant="contained" color="secondary" size="large" disableElevation sx={{ borderRadius: '10px', mt: '10px', ml: '40%'}}>
        Сохранить
        </Button>
    </div>
  );
}