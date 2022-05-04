import React from 'react';
import { Typography, Stack, Button, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

function SignIn() {

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div>
      <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '100%', marginRight: '17px'}}>
        <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Авторизация</Typography>
        <Stack
          component="form"
          sx={{
            width: '100%',
            marginTop: '30px',
          }}
          spacing={3}
          noValidate
          autoComplete="off"
          alignItems="center"
        >
          <TextField sx={{ width: '40ch' }} label="Логин" size='small' />
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
            spacing={5}
            noValidate
            autoComplete="off"
            direction="row"
            >
                <Button variant="text" size="large" color="primary" disableElevation>Регистрация</Button>
                <Button variant="contained" size="large" color="secondary" disableElevation>Войти</Button>
            </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default SignIn;