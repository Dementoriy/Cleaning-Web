import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import AuthService from '../../redux/services/AuthService';

export default function Profile() {
  const user = useSelector((state: RootState) => state);
  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', marginTop: '17px',  width: '100%'}}>
        <Stack direction="row" spacing={2}>
            <Avatar alt="Avatar" src="/image/ava.png" sx={{ width: 120, height: 120 }}/>
            <Stack spacing={1}>
              <Typography color="primary" variant="h4" sx={{fontWeight: '500'}}>
                {user.client.client!.surname} {user.client.client!.name} {user.client.client!.middleName}
              </Typography>
              <Typography color="primary" variant="h5">@{user.client.client!.login}</Typography>
            </Stack>
        </Stack>
        <Stack
          component="form"
          sx={{
            width: '60%',
            mt: '30px',
            fontFamily: 'Raleway',
            fontWeight: '500'
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField label="Фамилия" size='small' value={user.client.client!.surname} />
          <TextField label="Имя" size='small' value={user.client.client!.name} />
          <TextField label="Отчество" size='small' value={user.client.client!.middleName} />
          <TextField label="Номер телефона" size='small' value={user.client.client!.phone} />
          <TextField label="Email" size='small' value={user.client.client!.email} />
        </Stack>
        <Button variant="contained" color="secondary" size="medium" disableElevation sx={{ borderRadius: '10px', mt: '10px', ml: '43%'}}>
        Сохранить
        </Button>
    </div>
  );
}