import React, { useState } from 'react';
import { Typography, Stack, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {LoginModel} from '../../models/RequestModels';
import AuthService from '../../redux/services/AuthService';
import {LoginSuccess} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import sha256 from "sha256";
import {useNavigate} from 'react-router-dom';
import {clientActions} from '../../redux/slices/clientSlice';

interface State {
    login: string;
    password: string;
    showPassword: boolean;
  }
  

export default function SignIn() {

  const [values, setValues] = React.useState<State>({
      login: '',
      password: '',
      showPassword: false
  });
  
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
    });
  };
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onClick = () => {
		const data: LoginModel = {
			login: values.login,
			password: sha256(values.password)
		};
		AuthService.login(data).then((res) => {
			dispatch(res)
			if (res.type === clientActions.loginSuccess.type) {
				navigate("/profile");
			}
		})
	};

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', marginTop: '17px', width: '100%', marginRight: '17px'}}>
      <Typography variant="h5" color="primary" align='center'>Авторизация</Typography>
      <Stack
        component="form"
        sx={{
          width: '100%',
          mt: '30px',
        }}
        spacing={3}
        noValidate
        autoComplete="off"
        alignItems="center"
      >
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
        <Stack
        component="form"
        sx={{marginTop: '20px',}}
        spacing={1}
        noValidate
        autoComplete="off"
        direction="row"
        justifyContent="space-between"
        >
          <Button variant="text" size="large" color="primary" disableElevation onClick={() => {navigate("/registration")}}>Регистрация</Button>
          <Button variant="contained" size="large" color="secondary" sx={{ borderRadius: '10px'}} onClick={onClick} disableElevation>Войти</Button>
        </Stack>
      </Stack>
    </div>
  );
}