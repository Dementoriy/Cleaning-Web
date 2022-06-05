import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";

export default function Profile() {
  const user = useSelector((state: RootState) => state);
  const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px',  width: '100%', height: '100%'}}>
      {user.client.isAuth && (
        <>
        <Stack direction="row" spacing={2}>
          <Avatar alt={user.client.client!.login.toUpperCase()} src={user.client.client!.avatar} sx={{ width: 120, height: 120 }}/>
          <Stack spacing={0.5}>
            <div style={{height: '10px'}} />
            <Typography color="primary" variant="h5">
              {user.client.client!.surname} {user.client.client!.name} {user.client.client!.middleName}
            </Typography>
            <Typography color="primary" variant="h6">@{user.client.client!.login}</Typography>
          </Stack>
        </Stack>
        <Stack
          component="form"
          sx={{width: '60%', mt: '30px',}}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField label="Фамилия" size='small' value={user.client.client!.surname} onChange={handleChange} />
          <TextField label="Имя" size='small' value={user.client.client!.name} onChange={handleChange} />
          {
            (user.client.client!.middleName !== null && 
            <TextField label="Отчество" size='small' value={user.client.client!.middleName} onChange={handleChange} />
            )
          }
          <TextField label="Номер телефона" size='small' sx={{fontFamily: "Roboto"}} value={user.client.client!.phone} onChange={handleChange} />
          <TextField label="Email" size='small' value={user.client.client!.email} onChange={handleChange} />
        </Stack>
        <Button variant="contained" color="secondary" size="medium" disableElevation sx={{ borderRadius: '10px', mt: '10px', ml: '43%'}}>
        Сохранить
        </Button>
        </>
      )}
    </div>
  );
}