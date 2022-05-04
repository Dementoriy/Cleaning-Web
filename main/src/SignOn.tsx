import React from 'react';
import { Typography, Stack, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import sha256 from 'sha256';
import axios from 'axios';
import {setCookie} from 'typescript-cookie';
import {useNavigate} from 'react-router-dom';

interface RegisterData {
    surname: string;
    name: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    login: string;
    password: string;
    passwordCheck: string;
    showPassword: boolean;
  }
type Request = {
  login: string,
  password: string,
  surname: string,
  name: string,
  middlename: string,
  phoneNumber: string,
  email: string,
}

function SignOn() {


    const [values, setValues] = React.useState<RegisterData>({
        surname: "",
        name: "",
        middleName: "",
        phoneNumber: "",
        email: "",
        login: "",
        password: "",
        passwordCheck: "",
        showPassword: false,
      });
    
      const handleChange =
        (prop: keyof RegisterData) => (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, [prop]: event.target.value });
        };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

      const onClick = (event: any) => {
        if(values.password !== values.passwordCheck){
          alert("Пароли не совпадают, повторите попытку.");
          return;
        } 
        const data : Request = {
          login: values.login,
          password: sha256(values.password),
          surname: values.surname,
          name: values.name,
          middlename: values.middleName,
          phoneNumber: values.phoneNumber,
          email: values.email,
        }
        axios.post("http://localhost:8080/cleaning/registration", data).then((str) => {
          if(str.data.status){
            setCookie("token", str.data.answer.token, {
              expires : 1,
              path: "",
            })
            alert("Регистрация прошла успешно!");
          }
          else{
            alert("Не удалось зарегистрироваться");
          }
        }).catch((e) => {
          alert(e);
        })
      }

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '50%'}}>
        <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Регистрация</Typography>
        <Stack
          component="form"
          sx={{
            width: '100%',
            marginTop: '30px',
          }}
          spacing={2}
          noValidate
          autoComplete="off"
          alignItems="center"
        >
            <TextField sx={{ width: '40ch' }} label="Фамилия" size='small' value={values.surname} onChange={handleChange('surname')}/>
            <TextField sx={{ width: '40ch' }} label="Имя" size='small' value={values.name} onChange={handleChange('name')}/>
            <TextField sx={{ width: '40ch' }} label="Отчество" size='small' value={values.middleName} onChange={handleChange('middleName')}/>
            <TextField sx={{ width: '40ch' }} label="Email" size='small' value={values.email} onChange={handleChange('email')}/>
            <TextField sx={{ width: '40ch' }} label="Номер телефона" size='small' value={values.phoneNumber} onChange={handleChange('phoneNumber')}/>
            <TextField sx={{ width: '40ch' }} label="Логин" size='small' value={values.login} onChange={handleChange('login')}/>
            <FormControl sx={{ width: '40ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <TextField type="password" sx={{ width: '40ch' }} label="Повторите пароль" size='small' value={values.passwordCheck} onChange={handleChange('passwordCheck')}/>
            <Stack
            component="form"
            sx={{marginTop: '20px',}}
            spacing={5}
            noValidate
            autoComplete="off"
            direction="row"
            >
                <Button variant="text" size="large" color="primary" disableElevation>Авторизация</Button>
                <Button variant="contained" size="large" color="secondary" onClick={onClick} disableElevation>Далее</Button>
            </Stack>
        </Stack>
        
    </div>
  );
}

export default SignOn;