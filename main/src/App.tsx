import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material"; 

function App() {
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '48%'}}>
        <Stack direction="row" spacing={2}>
            <Avatar alt="Avatar" src="./assets/image/ava.png" sx={{ width: 120, height: 120 }}/>
            <Stack spacing={1}>
              <Typography color="primary" variant="h4" style={{fontWeight: '500'}}>Вафлев Адам Неадамович</Typography>
              <Typography color="primary" variant="h5">@Adam</Typography>
            </Stack>
        </Stack>
        <Stack
          component="form"
          sx={{
            width: '60%',
            marginTop: '30px',
            fontFamily: 'Raleway',
            fontWeight: '500'
          }}
          spacing={3}
          noValidate
          autoComplete="off"
        >
          <TextField label="Фамилия" size='small' />
          <TextField label="Имя" size='small' />
          <TextField label="Отчество" size='small'/>
          <TextField label="Номер телефона" size='small' />
          <TextField label="Почта" size='small' />
        </Stack>
        <Button variant="outlined" size="large" color="primary" sx={{mt: '10px'}}>Сохранить</Button>
    </div>
  );
}

export default App;