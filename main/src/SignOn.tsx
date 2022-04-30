import React from 'react';
import { Typography, Stack, Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

function SignOn() {

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
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '48%'}}>
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
            <TextField sx={{ width: '40ch' }} label="Фамилия" size='small' />
            <TextField sx={{ width: '40ch' }} label="Имя" size='small' />
            <TextField sx={{ width: '40ch' }} label="Отчество" size='small' />
            <TextField sx={{ width: '40ch' }} label="Email" size='small' />
            <TextField sx={{ width: '40ch' }} label="Номер телефона" size='small' />
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
            <FormControl sx={{ width: '40ch' }} variant="outlined" size='small'>
                <InputLabel htmlFor="outlined-adornment-password">Повторите пароль</InputLabel>
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
                <Button variant="text" size="large" color="primary" disableElevation>Авторизация</Button>
                <Button variant="contained" size="large" color="secondary" disableElevation>Далее</Button>
            </Stack>
        </Stack>
        
    </div>
  );
}

export default SignOn;