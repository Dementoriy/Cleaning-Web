import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {Client} from "../../models/ClientModel";
import ClientService from "../../redux/services/ClientService";

export default function Profile() {
  const client = useSelector((state: RootState) => state);
  const [user, setUser] = React.useState<Client>(client.client.client!);
  const [values, setValues] = React.useState<Client>({
    id: user.id,
    surname: user.surname,
    name: user.name,
    middleName: user.middleName,
    phone: user.phone,
    email: user.email,
    login: user.login,
    isOld: user.isOld,
    avatar: user.avatar
  });
  const handleChange =
        (prop: keyof Client) => (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, [prop]: event.target.value });
        };

  const changeUser = () => {
    const user : Client = {
      id: values.id,
      surname: values.surname,
      name: values.name,
      middleName: values.middleName,
      phone: values.phone,
      email: values.email,
      login: values.login,
      isOld: values.isOld,
      avatar: values.avatar
    }
    ClientService.updateClientInfo(user!).then((res: any) => {
      setUser(res!);
    })
  }
  const addAvatar = (event : any) =>{
    const file : File = event.target.files[0];
    if(file === undefined)
      return;
    const reader = new FileReader();
    reader.onloadend = function(){
      setValues({...values, avatar: reader.result!.toString()});
      console.log(reader.result!.toString());
    }
    reader.readAsDataURL(file);
  }

  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px',  width: '100%', height: '100%'}}>
      {client.client.isAuth && (
        <>
        <Stack direction="row" spacing={2}>
          <Avatar alt={user.login.toUpperCase()} src={user.avatar} sx={{ width: 120, height: 120 }}/>
          <Stack spacing={0.5}>
            <div style={{height: '10px'}} />
            <Typography color="primary" variant="h5">
              {user.surname} {user.name} {user.middleName}
            </Typography>
            <Typography color="primary" variant="h6">@{user.login}</Typography>
          </Stack>
        </Stack>
        <Stack
          component="form"
          sx={{width: '60%', mt: '30px',}}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField label="??????????????" size='small' defaultValue={values.surname} onChange={handleChange('surname')}/>
          <TextField label="??????" size='small' defaultValue={values.name} onChange={handleChange('name')}/>
          {
            (values.middleName !== null && 
            <TextField label="????????????????" size='small' defaultValue={values.middleName} onChange={handleChange('middleName')}/>
            )
          }
          <TextField label="?????????? ????????????????" size='small' sx={{fontFamily: "Roboto"}} defaultValue={values.phone} onChange={handleChange('phone')}/>
          <TextField label="Email" size='small' defaultValue={values.email} onChange={handleChange('email')}/>
        </Stack>
        <Stack direction='row' spacing={2} sx={{ borderRadius: '10px', mt: '10px', ml: '20%'}}>
          <Button variant="contained" color="secondary" component="label" size="medium" disableElevation sx={{ borderRadius: '10px'}}>
            ?????????????? ????????????<input type='file' accept='image/*' hidden onChange={addAvatar}/>
          </Button>
          <Button variant="contained" color="secondary" size="medium" disableElevation sx={{ borderRadius: '10px'}} onClick={changeUser}>
          ??????????????????
          </Button>
        </Stack>

        </>
      )} 
    </div>
  );
}